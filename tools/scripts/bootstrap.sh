if [ "$WARTHOG_ENV" = "production" ]; then
    echo "Error: can't bootstrap in production"
    exit 1
fi

yarn
yarn build
yarn db:drop
yarn db:create 
yarn db:migrate
yarn db:seed
