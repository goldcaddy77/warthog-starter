# import .env file
set -a
. ./.env >/dev/null 2>&1
set +a

WARTHOG_ENV=test yarn run config
sleep 1 # at times, the new config is not picked up and Prod config will creep in
yarn db:drop
yarn db:create
yarn jest --verbose
