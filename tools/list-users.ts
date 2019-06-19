import 'reflect-metadata';

import { Binding } from '../generated/binding';
import { loadConfig } from '../src/config';
import { Logger } from '../src/logger';
import { getServer } from '../src/server';

async function bootstrap() {
  loadConfig();

  const server = getServer({ introspection: true, openPlayground: false }, { logging: false });
  await server.start();

  // Note: this binding is type-safe from your generated API.
  // i.e. you can dot into your API:  binding.query.us___ and it will autofill
  const binding = ((await server.getBinding()) as unknown) as Binding;

  const users = await binding.query.users(
    { limit: 5, orderBy: 'createdAt_DESC' },
    `{ id firstName email}`
  );

  Logger.info('users', users);

  server.stop();
}

bootstrap().catch((error: Error) => {
  Logger.info('Caught Error!!!');
  Logger.error(error);
  if (error.stack) {
    Logger.error(error.stack.split('\n').slice(0, 20));
  }
  process.exit(1);
});
