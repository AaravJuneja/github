import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
const username = process.argv[2] || "MuginoMinato";

if (!url || !authToken) {
  console.error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN first (see .dev.vars / `bun run cf:setup`).");
  process.exit(1);
}

const db = createClient({ url, authToken });
const user = (await db.execute({ sql: "SELECT id FROM users WHERE username = ?", args: [username] })).rows[0];
if (!user) {
  console.error(`User not found: ${username}`);
  process.exit(1);
}

const days = 364;
const today = new Date();
const rows = [];
let total = 0;
for (let i = days - 1; i >= 0; i -= 1) {
  const d = new Date(today);
  d.setDate(d.getDate() - i);
  const date = d.toISOString().slice(0, 10);
  const idx = days - 1 - i;
  const wave = Math.sin(idx * 0.73) + Math.cos(idx * 0.19) + Math.sin(idx * 0.11);
  const count = wave > 1.45 ? 9 : wave > 0.55 ? 6 : wave > -0.2 ? 4 : wave > -1.1 ? 2 : 0;
  if (count > 0) {
    rows.push({ sql: "INSERT OR REPLACE INTO contributions (user_id, date, count) VALUES (?, ?, ?)", args: [user.id, date, count] });
    total += count;
  }
}

if (rows.length > 0) await db.batch(rows);
console.log(`Seeded ${rows.length} active days (${total} contributions) for ${username}.`);
