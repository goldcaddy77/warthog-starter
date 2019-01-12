import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { Container } from 'typedi';
dotenv.config();

import { getApp } from '../src/app';
import { Binding } from '../generated/binding';

async function bootstrap() {
  const app = getApp({ container: Container }, { logging: false });
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
