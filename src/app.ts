import 'reflect-metadata';

import { Request } from 'express';
import { Container } from 'typedi';
import { App, AppOptions, BaseContext } from 'warthog';

interface Context extends BaseContext {
  user: {
    email: string;
    id: string;
    permissions: string;
  };
}

export function getApp(appOptions: AppOptions<Context> = {}, dbOptions: any = {}) {
  return new App<Context>(
    {
      container: Container,
      context: (request: Request) => {
        // Inject a fake user.  In a real app you'd parse the JWT from the headers
        const userId = JSON.stringify(request.headers).length.toString();
        return {
          user: {
            email: `${userId}@test.com`,
            id: userId,
            permissions: ['user:read', 'user:update', 'user:create', 'user:delete', 'photo:delete']
          }
        };
      },
      ...appOptions
    },
    dbOptions
  );
}
