# import .env file
set -a
. ./.env >/dev/null 2>&1
set +a

if [ -z "$WARTHOG_ENV" ]; then
  WARTHOG_ENV=local
fi
yarn run config

if [ -z "$WARTHOG_BUILD_ENV" ]; then
  yarn ts-node --type-check src/index.ts
else
  node dist/src/index.js
fi
