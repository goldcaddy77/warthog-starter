# Add local environment variables first
if [ -f .env.local ]; then
  echo ".env.local exists."

  set -a
  . ./.env.local >/dev/null 2>&1
  set +a
fi

# Then run config to generate our .env
if [ -z "$WARTHOG_ENV" ]; then
  export WARTHOG_ENV=local
fi

yarn run config

if [ -z "$WARTHOG_BUILD_ENV" ]; then
  yarn ts-node --type-check src/index.ts
else
  node dist/src/index.js
fi
