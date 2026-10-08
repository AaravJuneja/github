import { Hono } from "hono";
import { cors } from "hono/cors";
import { getDb, publicUser } from "./db.js";
import { hashPassword, verifyPassword, signToken, requireAuth } from "./auth.js";

const app = new Hono();

app.use("/api/*", cors({
  origin: (origin) => origin || "*",
  allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
}));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9-]{1,39}$/;

function json(c, data, status = 200) {
  return c.json(data, status);
}

function toInt(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

async function uniqueUsername(db, base) {
  let candidate = base.slice(0, 39) || "user";
  for (let i = 0; i < 20; i += 1) {
    const name = i === 0 ? candidate : `${candidate.slice(0, 36)}-${i}`;
    const row = await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [name] });
    if (row.rows.length === 0) return name;
  }
  return `${candidate.slice(0, 30)}-${Date.now().toString(36)}`;
}

app.get("/api/health", async (c) => {
  try {
    const db = getDb(c.env);
    await db.execute("SELECT 1");
    return json(c, { ok: true, time: new Date().toISOString(), db: "up" });
  } catch (e) {
    return json(c, { ok: false, error: e.message }, e.status || 500);
  }
});

app.post("/api/auth/signup", async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    let username = String(body.username || "").trim();
    const name = String(body.name || "").trim() || username || email.split("@")[0] || "user";

    if (!EMAIL_RE.test(email)) return json(c, { error: "Enter a valid email address." }, 400);
    if (!password) return json(c, { error: "Password is required." }, 400);
    if (username && !USERNAME_RE.test(username)) {
      return json(c, { error: "Username may only contain letters, numbers and dashes (max 39)." }, 400);
    }

    const db = getDb(c.env);
    const existing = await db.execute({
      sql: "SELECT id FROM users WHERE email = ?",
      args: [email],
    });
    if (existing.rows.length > 0) return json(c, { error: "That email is already registered. Try signing in." }, 409);

    if (!username) username = await uniqueUsername(db, email.split("@")[0].replace(/[^a-zA-Z0-9-]/g, "-"));
    else {
      const taken = await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [username] });
      if (taken.rows.length > 0) username = await uniqueUsername(db, username);
    }

    const password_hash = await hashPassword(password);
    const inserted = await db.execute({
      sql: `INSERT INTO users (username, name, email, password_hash) VALUES (?, ?, ?, ?) RETURNING id, username, name, email, bio, location, website, avatar_url, followers, following, created_at`,
      args: [username, name, email, password_hash],
    });
    const user = inserted.rows[0];
    const token = await signToken(c.env, user);
    return json(c, { token, user: publicUser(user) }, 201);
  } catch (e) {
    return json(c, { error: e.message || "Signup failed." }, e.status || 500);
  }
});

app.post("/api/auth/login", async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    if (!EMAIL_RE.test(email) || !password) {
      return json(c, { error: "Enter your email and password." }, 400);
    }
    const db = getDb(c.env);
    const found = await db.execute({ sql: "SELECT * FROM users WHERE email = ?", args: [email] });
    const user = found.rows[0];
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return json(c, { error: "Incorrect email or password." }, 401);
    }
    const token = await signToken(c.env, user);
    return json(c, { token, user: publicUser(user) });
  } catch (e) {
    return json(c, { error: e.message || "Login failed." }, e.status || 500);
  }
});

app.get("/api/me", async (c) => {
  try {
    const claims = await requireAuth(c.req.raw, c.env);
    const db = getDb(c.env);
    const found = await db.execute({ sql: "SELECT * FROM users WHERE id = ?", args: [claims.sub] });
    if (found.rows.length === 0) return json(c, { error: "Account not found." }, 404);
    return json(c, { user: publicUser(found.rows[0]) });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

const URL_RE = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

app.patch("/api/me", async (c) => {
  try {
    const claims = await requireAuth(c.req.raw, c.env);
    const body = await c.req.json().catch(() => ({}));
    const db = getDb(c.env);
    const id = Number(claims.sub);
    const updates = [];
    const args = [];
    if (body.name !== undefined) {
      const name = String(body.name || "").trim().slice(0, 80);
      if (!name) return json(c, { error: "Name cannot be blank." }, 400);
      updates.push("name = ?");
      args.push(name);
    }
    if (body.username !== undefined) {
      const username = String(body.username || "").trim();
      if (!USERNAME_RE.test(username)) {
        return json(c, { error: "Username may only contain letters, numbers and dashes (max 39)." }, 400);
      }
      const taken = await db.execute({
        sql: "SELECT id FROM users WHERE LOWER(username) = LOWER(?) AND id != ?",
        args: [username, id],
      });
      if (taken.rows.length > 0) return json(c, { error: "That username is taken." }, 409);
      updates.push("username = ?");
      args.push(username);
    }
    if (body.email !== undefined) {
      const email = String(body.email || "").trim().toLowerCase();
      if (!EMAIL_RE.test(email)) return json(c, { error: "Enter a valid email address." }, 400);
      const taken = await db.execute({
        sql: "SELECT id FROM users WHERE email = ? AND id != ?",
        args: [email, id],
      });
      if (taken.rows.length > 0) return json(c, { error: "That email is already registered." }, 409);
      updates.push("email = ?");
      args.push(email);
    }
    if (body.bio !== undefined) {
      const bio = String(body.bio || "").trim();
      if (bio.length > 160) return json(c, { error: "Bio is limited to 160 characters." }, 400);
      updates.push("bio = ?");
      args.push(bio);
    }
    if (body.location !== undefined) {
      updates.push("location = ?");
      args.push(String(body.location || "").trim().slice(0, 100));
    }
    if (body.website !== undefined) {
      const website = String(body.website || "").trim().slice(0, 255);
      if (website && !URL_RE.test(website)) {
        return json(c, { error: "Website must start with http:// or https://." }, 400);
      }
      updates.push("website = ?");
      args.push(website);
    }
    for (const field of ["instagram_url", "linkedin_url"]) {
      if (body[field] !== undefined) {
        const value = String(body[field] || "").trim().slice(0, 255);
        if (value && !URL_RE.test(value)) {
          return json(c, { error: "Social links must start with http:// or https://." }, 400);
        }
        updates.push(`${field} = ?`);
        args.push(value);
      }
    }
    if (!updates.length) return json(c, { error: "Nothing to update." }, 400);
    args.push(id);
    await db.execute({ sql: `UPDATE users SET ${updates.join(", ")} WHERE id = ?`, args });
    const found = await db.execute({ sql: "SELECT * FROM users WHERE id = ?", args: [id] });
    return json(c, { user: publicUser(found.rows[0]) });
  } catch (e) {
    return json(c, { error: e.message || "Update failed." }, e.status || 500);
  }
});

app.post("/api/me/password", async (c) => {
  try {
    const claims = await requireAuth(c.req.raw, c.env);
    const body = await c.req.json().catch(() => ({}));
    const current = String(body.current || "");
    const next = String(body.next || "");
    if (!current || !next) return json(c, { error: "Enter your current password and a new one." }, 400);
    const db = getDb(c.env);
    const found = await db.execute({ sql: "SELECT * FROM users WHERE id = ?", args: [Number(claims.sub)] });
    const user = found.rows[0];
    if (!user) return json(c, { error: "Account not found." }, 404);
    if (!(await verifyPassword(current, user.password_hash))) {
      return json(c, { error: "Your current password is incorrect." }, 401);
    }
    await db.execute({
      sql: "UPDATE users SET password_hash = ? WHERE id = ?",
      args: [await hashPassword(next), Number(claims.sub)],
    });
    return json(c, { ok: true });
  } catch (e) {
    return json(c, { error: e.message || "Password change failed." }, e.status || 500);
  }
});

async function loadProfile(db, username, { includePrivate = false } = {}) {
  const found = await db.execute({ sql: "SELECT * FROM users WHERE username = ?", args: [username] });
  const user = found.rows[0];
  if (!user) return null;
  const visibility = includePrivate ? "" : "AND is_private = 0";
  const repos = await db.execute({
    sql: `SELECT id, name, description, language, stars, forks, is_private, updated_at FROM repos WHERE owner_id = ? ${visibility} ORDER BY stars DESC, updated_at DESC LIMIT 20`,
    args: [user.id],
  });
  const counted = await db.execute({
    sql: `SELECT COUNT(*) AS total FROM repos WHERE owner_id = ? ${visibility}`,
    args: [user.id],
  });
  const contrib = await db.execute({
    sql: "SELECT COALESCE(SUM(count), 0) AS total FROM contributions WHERE user_id = ? AND date >= date('now', '-364 days')",
    args: [user.id],
  });
  const stars = await db.execute({
    sql: `SELECT COALESCE(SUM(stars), 0) AS total FROM repos WHERE owner_id = ? ${visibility}`,
    args: [user.id],
  });
  return {
    user: publicUser(user),
    repos: repos.rows,
    stats: {
      contributionsLastYear: toInt(contrib.rows[0]?.total),
      totalStars: toInt(stars.rows[0]?.total),
      repoCount: toInt(counted.rows[0]?.total),
    },
  };
}

app.get("/api/users/:username", async (c) => {
  try {
    const db = getDb(c.env);
    const claims = await requireAuth(c.req.raw, c.env).catch(() => null);
    const found = await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [c.req.param("username")] });
    if (found.rows.length === 0) return json(c, { error: "User not found." }, 404);
    const includePrivate = Boolean(claims) && Number(claims.sub) === Number(found.rows[0].id);
    const profile = await loadProfile(db, c.req.param("username"), { includePrivate });
    if (!profile) return json(c, { error: "User not found." }, 404);
    return json(c, profile);
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.get("/api/users/:username/repos", async (c) => {
  try {
    const db = getDb(c.env);
    const found = await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [c.req.param("username")] });
    if (found.rows.length === 0) return json(c, { error: "User not found." }, 404);
    const claims = await requireAuth(c.req.raw, c.env).catch(() => null);
    const includePrivate = Boolean(claims) && Number(claims.sub) === Number(found.rows[0].id);
    const visibility = includePrivate ? "" : "AND is_private = 0";
    const repos = await db.execute({
      sql: `SELECT id, name, description, language, stars, forks, is_private, updated_at FROM repos WHERE owner_id = ? ${visibility} ORDER BY stars DESC LIMIT 50`,
      args: [found.rows[0].id],
    });
    return json(c, { repos: repos.rows });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.get("/api/users/:username/contributions", async (c) => {
  try {
    const db = getDb(c.env);
    const year = String(c.req.query("year") || "").slice(0, 4);
    const found = await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [c.req.param("username")] });
    if (found.rows.length === 0) return json(c, { error: "User not found." }, 404);
    const userId = found.rows[0].id;
    const rows = /^\d{4}$/.test(year)
      ? await db.execute({ sql: "SELECT date, count FROM contributions WHERE user_id = ? AND substr(date, 1, 4) = ? ORDER BY date", args: [userId, year] })
      : await db.execute({ sql: "SELECT date, count FROM contributions WHERE user_id = ? AND date >= date('now', '-364 days') ORDER BY date", args: [userId] });
    const total = rows.rows.reduce((sum, r) => sum + toInt(r.count), 0);
    return json(c, { contributions: rows.rows, total });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.post("/api/users/:username/follow", async (c) => {
  try {
    const claims = await requireAuth(c.req.raw, c.env);
    const db = getDb(c.env);
    const target = await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [c.req.param("username")] });
    if (target.rows.length === 0) return json(c, { error: "User not found." }, 404);
    const followingId = target.rows[0].id;
    const followerId = Number(claims.sub);
    if (followerId === followingId) return json(c, { error: "You cannot follow yourself." }, 400);
    await db.batch([
      { sql: "INSERT OR IGNORE INTO follows (follower_id, following_id) VALUES (?, ?)", args: [followerId, followingId] },
      { sql: "UPDATE users SET followers = (SELECT COUNT(*) FROM follows WHERE following_id = ?) WHERE id = ?", args: [followingId, followingId] },
      { sql: "UPDATE users SET following = (SELECT COUNT(*) FROM follows WHERE follower_id = ?) WHERE id = ?", args: [followerId, followerId] },
    ]);
    return json(c, { following: true });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.delete("/api/users/:username/follow", async (c) => {
  try {
    const claims = await requireAuth(c.req.raw, c.env);
    const db = getDb(c.env);
    const target = await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [c.req.param("username")] });
    if (target.rows.length === 0) return json(c, { error: "User not found." }, 404);
    const followingId = target.rows[0].id;
    const followerId = Number(claims.sub);
    await db.batch([
      { sql: "DELETE FROM follows WHERE follower_id = ? AND following_id = ?", args: [followerId, followingId] },
      { sql: "UPDATE users SET followers = (SELECT COUNT(*) FROM follows WHERE following_id = ?) WHERE id = ?", args: [followingId, followingId] },
      { sql: "UPDATE users SET following = (SELECT COUNT(*) FROM follows WHERE follower_id = ?) WHERE id = ?", args: [followerId, followerId] },
    ]);
    return json(c, { following: false });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.get("/api/search", async (c) => {
  try {
    const q = String(c.req.query("q") || "").trim().slice(0, 80);
    if (!q) return json(c, { users: [], repos: [] });
    const like = `%${q}%`;
    const db = getDb(c.env);
    const users = await db.execute({
      sql: "SELECT username, name, bio, followers FROM users WHERE username LIKE ? OR name LIKE ? ORDER BY followers DESC LIMIT 10",
      args: [like, like],
    });
    const repos = await db.execute({
      sql: "SELECT r.name, r.description, r.language, r.stars, u.username AS owner FROM repos r JOIN users u ON u.id = r.owner_id WHERE r.name LIKE ? OR r.description LIKE ? ORDER BY r.stars DESC LIMIT 10",
      args: [like, like],
    });
    return json(c, { users: users.rows, repos: repos.rows });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

const REPO_NAME_RE = /^[a-zA-Z0-9._-]{1,100}$/;

app.post("/api/repos", async (c) => {
  try {
    const claims = await requireAuth(c.req.raw, c.env);
    const body = await c.req.json().catch(() => ({}));
    const name = String(body.name || "").trim().slice(0, 100);
    const description = String(body.description || "").trim().slice(0, 300);
    const language = String(body.language || "").trim().slice(0, 30);
    const isPrivate = body.is_private ? 1 : 0;
    if (!REPO_NAME_RE.test(name)) {
      return json(c, { error: "Repository name may only contain letters, numbers, dots, dashes and underscores." }, 400);
    }
    const db = getDb(c.env);
    try {
      const inserted = await db.execute({
        sql: "INSERT INTO repos (owner_id, name, description, language, is_private) VALUES (?, ?, ?, ?, ?) RETURNING id, name, description, language, stars, forks, is_private, updated_at",
        args: [Number(claims.sub), name, description, language, isPrivate],
      });
      return json(c, { repo: inserted.rows[0] }, 201);
    } catch (e) {
      if (String(e.message || "").includes("UNIQUE")) {
        return json(c, { error: "You already have a repository with that name." }, 409);
      }
      throw e;
    }
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

const PLAN_PRICES = {
  COPILOT: 1200,
  PRO: 2200,
  STEALTH: 2800,
  GHOST: 3500,
  TEAM: 1800,
  CLARITY: 58000,
};

async function stripeFetch(secret, path, options = {}) {
  const res = await fetch(`https://api.stripe.com${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${secret}`, ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    /** @type {any} */ const err = new Error((data.error && data.error.message) || "Stripe request failed.");
    err.status = 502;
    throw err;
  }
  return data;
}

app.post("/api/checkout", async (c) => {
  try {
    const claims = await requireAuth(c.req.raw, c.env);
    const secret = (/** @type {any} */ (c.env)).STRIPE_SECRET_KEY;
    if (!secret) {
      /** @type {any} */ const err = new Error("Payments are not configured yet.");
      err.status = 501;
      throw err;
    }
    const body = await c.req.json().catch(() => ({}));
    const plan = String(body.plan || "").toUpperCase();
    const amount = PLAN_PRICES[plan];
    if (!amount) return json(c, { error: "Unknown plan." }, 400);
    const origin = new URL(c.req.url).origin;
    const params = new URLSearchParams({
      mode: "subscription",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][unit_amount]": String(amount),
      "line_items[0][price_data][recurring][interval]": "month",
      "line_items[0][price_data][product_data][name]": `GitHub ${plan} plan`,
      "line_items[0][quantity]": "1",
      success_url: `${origin}/pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      "metadata[plan]": plan,
      "metadata[username]": String(claims.username || ""),
    });
    if (claims.email) params.set("customer_email", String(claims.email));
    const data = await stripeFetch(secret, "/v1/checkout/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    return json(c, { url: data.url });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.get("/api/checkout/:id", async (c) => {
  try {
    await requireAuth(c.req.raw, c.env);
    const secret = (/** @type {any} */ (c.env)).STRIPE_SECRET_KEY;
    if (!secret) {
      /** @type {any} */ const err = new Error("Payments are not configured yet.");
      err.status = 501;
      throw err;
    }
    const id = String(c.req.param("id")).slice(0, 100);
    if (!/^cs_(test|live)_/.test(id)) return json(c, { error: "Unknown session." }, 400);
    const data = await stripeFetch(secret, `/v1/checkout/sessions/${encodeURIComponent(id)}`);
    return json(c, {
      status: data.payment_status,
      plan: (data.metadata && data.metadata.plan) || null,
      amount: data.amount_total,
      currency: data.currency,
      livemode: data.livemode,
    });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.get("/api/marketplace", async (c) => {
  try {
    const db = getDb(c.env);
    const repos = await db.execute({
      sql: "SELECT r.name, r.description, r.language, r.stars, r.forks, r.is_private, r.updated_at, u.username AS owner, u.name AS owner_name, u.avatar_url AS owner_avatar FROM repos r JOIN users u ON u.id = r.owner_id ORDER BY r.stars DESC LIMIT 6",
      args: [],
    });
    return json(c, { repos: repos.rows });
  } catch (e) {
    return json(c, { error: e.message }, e.status || 500);
  }
});

app.all("/api/*", (c) => json(c, { error: "Not found." }, 404));

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return app.fetch(request, env, ctx);
    if (env.ASSETS) {
      const asset = await env.ASSETS.fetch(request).catch(() => null);
      if (asset && asset.status !== 404) return asset;
      const fallbackUrl = new URL("/index.html", url.origin).toString();
      const fallback = await env.ASSETS.fetch(fallbackUrl).catch(() => null);
      if (fallback && fallback.ok) {
        const headers = new Headers(fallback.headers);
        headers.set("Content-Type", "text/html;charset=UTF-8");
        return new Response(fallback.body, { status: 200, headers });
      }
    }
    return app.fetch(request, env, ctx);
  },
};
