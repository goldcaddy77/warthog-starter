import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import { getApp } from './app';

async function bootstrap(): Promise<any> {
  const app = getApp();
  return app.start();
}

bootstrap().catch((error: Error) => {
  console.error(error);
  if (error.stack) {
    console.error(error.stack.split('\n'));
  }
  process.exit(1);
});
