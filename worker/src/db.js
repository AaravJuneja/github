import { createClient } from "@libsql/client/web";

let cached = null;
let cachedKey = "";

export function getDb(env) {
  const url = env.TURSO_DATABASE_URL;
  const authToken = env.TURSO_AUTH_TOKEN;
  if (!url || !authToken) {
    /** @type {any} */ const err = new Error(
      "Database connection is not configured."
    );
    err.status = 500;
    throw err;
  }
  const key = `${url}`;
  if (!cached || cachedKey !== key) {
    cached = createClient({ url, authToken });
    cachedKey = key;
  }
  return cached;
}

export function publicUser(row) {
  if (!row) return null;
  const { password_hash, ...rest } = row;
  return rest;
}
