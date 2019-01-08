import 'reflect-metadata';

import { App, AppOptions } from 'warthog';

export function getApp(appOptions: Partial<AppOptions> = {}, dbOptions: any = {}) {
  return new App(appOptions, {
    cache: true,
    port: 5432,
    host: 'localhost',
    entities: ['src/**/*.entity.ts'],
    synchronize: true,
    logger: 'advanced-console',
    logging: 'all',
    type: 'postgres',
    ...dbOptions
  });
}
