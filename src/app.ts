import "reflect-metadata";

import { Request } from "express";
import { Container } from "typedi";
import { App, BaseContext } from "warthog";

interface Context extends BaseContext {
  user: {
    email: string;
    id: string;
    permissions: string;
  };
}

export function getApp(appOptions = {}, dbOptions = {}) {
  return new App<Context>(
    {
      container: Container,
      // Inject a fake user.  In a real app you'd parse a JWT to add the user
      context: (request: Request) => {
        return {
          user: {
            email: "admin@test.com",
            id: "abc12345",
            permissions: [
              "user:read",
              "user:update",
              "user:create",
              "user:delete",
              "photo:delete"
            ]
          }
        };
      },
      ...appOptions
    },
    dbOptions
  );
}
