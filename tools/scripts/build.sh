# This is the script that is run as part of the Heroku build process, so it needs to do
# everything to get a Production system built
# If STACK is set, it means we're in the Heroku build ENV

# Add local environment variables first
if [ -f .env.local ]; then
  set -a
  . ./.env.local >/dev/null 2>&1
  set +a
fi

yarn run codegen
yarn run compile

### HEROKU ###
# Rebuild .env after codegen (which sets it to development values)
if test -n "${STACK-}"; then
  env
  PORT=1111 yarn run config
fi
