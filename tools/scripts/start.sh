# import .env file
set -a
. ./.env >/dev/null 2>&1
set +a

if [ ! -z "$WARTHOG_ENV" ]; then
  yarn dotenv:generate
fi

if [ -z "$WARTHOG_BUILD_ENV" ]; then
  yarn ts-node --type-check src/index.ts
else
  node dist/src/index.js
fi