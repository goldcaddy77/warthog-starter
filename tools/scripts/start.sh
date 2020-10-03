# Add local environment variables first
if [ -f .env.local ]; then
  set -a
  . ./.env.local >/dev/null 2>&1
  set +a
fi

# Then run config to generate our .env
if [ -z "$WARTHOG_ENV" ]; then
  export WARTHOG_ENV=local
fi
yarn run config

build_env="$(./node_modules/.bin/dotenv -p WARTHOG_BUILD_ENV)"
echo "$build_env"
echo "$build_env"
echo "$build_env"
echo "$build_env"

if [ "$build_env" = "true" ]; then
  echo "Running compiled JS"
  node dist/src/index.js
else
  echo "Running TypeScript code"
  yarn ts-node --type-check src/index.ts
fi
