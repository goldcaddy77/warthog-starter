import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { Container } from 'typedi';

dotenv.config();

import { getApp } from './app';

async function bootstrap() {
  const app = getApp({
    container: Container
  });
  await app.start();
}

bootstrap().catch((error: Error) => {
  console.error(error);
  if (error.stack) {
    console.error(error.stack!.split('\n'));
  }
  process.exit(1);
});
