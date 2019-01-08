import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { Container } from 'typedi';
import { useContainer as TypeGraphQLUseContainer } from 'type-graphql';
import { useContainer as TypeORMUseContainer } from 'typeorm';

dotenv.config();

import { getApp } from '../src/app';
import { Binding } from '../generated/binding';

async function bootstrap() {
  TypeGraphQLUseContainer(Container);
  TypeORMUseContainer(Container);

  const app = getApp({}, { logging: false });
  await app.start();

  // Note: this binding is type-safe from your generated API.
  // i.e. you can dot into your API:  binding.query.us___ and it will autofill
  const binding = ((await app.getBinding()) as unknown) as Binding; // tslint:disable-line

  let users = await binding.query.users({ limit: 5, orderBy: 'createdAt_DESC' }, `{ id firstName email}`);

  console.log('users', users);

  app.stop();
}

bootstrap().catch((error: Error) => {
  console.log('Caught Error!!!');
  console.error(error);
  if (error.stack) {
    console.error(error.stack!.split('\n').slice(0, 20));
  }
  process.exit(1);
});
