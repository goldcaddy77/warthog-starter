import 'reflect-metadata';

const dotenv = require('dotenv');
import { Container } from 'typedi';
import { useContainer as TypeGraphQLUseContainer } from 'type-graphql';
import { useContainer as TypeORMUseContainer } from 'typeorm';

dotenv.config(); // Load environment variables

import { getApp } from './app';

async function bootstrap() {
  TypeGraphQLUseContainer(Container);
  TypeORMUseContainer(Container);

  const app = getApp();
  await app.start();
}

bootstrap().catch((error: Error) => {
  console.error(error);
  if (error.stack) {
    console.error(error.stack!.split('\n'));
  }
  process.exit(1);
});
