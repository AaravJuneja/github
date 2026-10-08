import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const enc = new TextEncoder();

function getSecret(env) {
  const s = env.JWT_SECRET;
  if (!s || s.length < 16) {
    /** @type {any} */ const err = new Error(
      "Authentication is not configured."
    );
    err.status = 500;
    throw err;
  }
  return enc.encode(s);
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  if (!hash) return false;
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export async function signToken(env, user) {
  return new SignJWT({
    sub: String(user.id),
    email: user.email,
    username: user.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret(env));
}

export async function requireAuth(request, env) {
  const header = request.headers.get("Authorization") || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    /** @type {any} */ const err = new Error("Missing bearer token");
    err.status = 401;
    throw err;
  }
  try {
    const { payload } = await jwtVerify(token, getSecret(env));
    return payload;
  } catch {
    /** @type {any} */ const err = new Error("Invalid or expired token");
    err.status = 401;
    throw err;
  }
}
