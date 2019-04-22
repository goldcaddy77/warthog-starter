# warthog-starter

This is a minimal example of using the [Warthog](https://github.com/goldcaddy77/warthog) GraphQL API library.

## Setup

To get things set up, 

1. Start PostgreSQL. You can BYO or we've provided a dockerized PostgreSQL, which can be run with `yarn postgres:start`
2. Install dependencies with `yarn bootstrap`

## Running the server

1. Start the PostgreSQL instance you created during setup
2. Run `yarn start` to run the server

## Using GraphQL Playground

When you run `yarn start`, it will open [graphql-playground](https://github.com/prisma/graphql-playground).  When in the playground, you can issue queries and mutations against the API.  Try some of the examples in [examples.gql](./examples.gql).

## Running tests

Run `yarn test` to run tests
