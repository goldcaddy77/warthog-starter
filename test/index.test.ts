import 'reflect-metadata';

import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import { Container } from 'typedi';

dotenv.config();

// Needs to happen before you import any models
import { getApp } from '../src/app';
const app = getApp({ container: Container }, { logging: false });

import { Binding } from '../generated/binding';
import { User, UserStatus } from '../src/user.model';

let binding: Binding;
let testUser: any;

beforeAll(async done => {
  console.error = jest.fn();

  await app.start();
  binding = ((await app.getBinding()) as unknown) as Binding; // TODO: clean this up

  const key = new Date().getTime();

  try {
    testUser = (await binding.mutation.createUser(
      {
        data: {
          email: `goldcaddy${key}@gmail.com`,
          firstName: `first ${key}`,
          lastName: `last ${key}`,
          status: UserStatus.ACTIVE
        }
      },
      `{ id email firstName lastName status }`
    )) as User;
  } catch (error) {
    throw new Error(error);
  }

  done();
});

afterAll(async done => {
  (console.error as any).mockRestore();
  await app.stop();
  done();
});

describe('Users', () => {
  test('find user by id', async done => {
    expect(testUser).toBeTruthy();

    const user = await binding.query.user({ where: { id: String(testUser.id) } }, `{ id }`);

    // If user tries to access a private field, it will throw a console error.
    // We should make sure we always fail tests console errors are encountered
    expect(console.error).not.toHaveBeenCalled();
    expect(user).toBeDefined();
    expect(user.id).toBe(testUser.id);
    done();
  });

  test('createdAt sort', async done => {
    const users = await binding.query.users(
      { limit: 1, orderBy: 'createdAt_DESC' },
      `{ id firstName}`
    );

    expect(console.error).not.toHaveBeenCalled();
    expect(users).toBeDefined();
    expect(users.length).toBe(1);
    expect(users[0].id).toBe(testUser.id);
    done();
  });

  test('uniqueness failure', async done => {
    let error: GraphQLError = new GraphQLError('');
    try {
      await binding.mutation.createUser(
        {
          data: {
            email: testUser.email,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            status: testUser.status
          }
        },
        `{ id email createdAt createdById }`
      );
    } catch (e) {
      error = e as GraphQLError;
    }
    // Note: this test can also surface if you have 2 separate versions of GraphQL installed (which is bad)
    expect(error).toBeInstanceOf(GraphQLError);
    expect(error.message).toContain('duplicate');
    done();
  });
});
