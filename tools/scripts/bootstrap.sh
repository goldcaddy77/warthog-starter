if [ "$WARTHOG_ENV" = "production" ]; then
    echo "Error: can't bootstrap in production"
    exit 1
fi

# Then run config to generate our .env
if [ -z "$WARTHOG_ENV" ]; then
  export WARTHOG_ENV=local
fi

yarn
yarn build
yarn db:drop
yarn db:create 
yarn db:migrate
yarn db:seed
