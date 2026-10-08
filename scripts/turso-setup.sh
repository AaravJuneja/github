#!/usr/bin/env bash
set -euo pipefail

DB="${TURSO_DB:-github}"

echo "==> Ensuring schema on Turso DB: $DB"
turso db shell "$DB" < db/schema.sql

URL="$(turso db show "$DB" --url | tr -d '[:space:]')"
echo "==> Database URL: $URL"

echo "==> Creating auth token (never expires)…"
TOKEN="$(turso db tokens create "$DB" --expiration never)"

if [ ! -f .dev.vars ]; then
  SECRET="$(bun -e 'console.log(require("crypto").randomBytes(32).toString("hex"))' 2>/dev/null || openssl rand -hex 32)"
  cat > .dev.vars <<EOF
TURSO_DATABASE_URL="$URL"
TURSO_AUTH_TOKEN="$TOKEN"
JWT_SECRET="$SECRET"
ENVIRONMENT="dev"
EOF
  echo "==> Wrote .dev.vars (gitignored)."
else
  echo "==> .dev.vars already exists; not overwriting."
  echo "Add/update these values manually:"
  echo "TURSO_DATABASE_URL=\"$URL\""
  echo "TURSO_AUTH_TOKEN=\"$TOKEN\""
fi

echo "==> Production secrets (run once per Worker):"
echo "    bunx wrangler secret put TURSO_DATABASE_URL"
echo "    bunx wrangler secret put TURSO_AUTH_TOKEN"
echo "    bunx wrangler secret put JWT_SECRET"
