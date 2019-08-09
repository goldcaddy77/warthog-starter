/* eslint-disable no-console */

import 'reflect-metadata';

// This is an integration test that uses a graphql-binding to test the APIs by issuing
// calls to the actual server. We should determine how we want to distinguish between the
// different types of tests.
import { GraphQLError } from 'graphql';
import { getBindingError } from 'warthog';

// TODO: If we create an integration test harness, we could make app a global and also load dotenv as part of the setup.
// Needs to happen before you import any models
import { Binding } from '../generated/binding';
import { loadConfig } from '../src/config';
import { getServer } from '../src/server';

let binding: Binding;

let server: any;

beforeAll(async done => {
  // process.env.DEBUG = undefined;

  loadConfig();

  server = getServer({ mockDBConnection: true }, { logging: false });
  await server.start();

  binding = ((await server.getBinding()) as unknown) as Binding;

  done();
});

afterAll(async done => {
  await server.stop();
  done();
});

describe('Project', () => {
  test('key format', async done => {
    let response: GraphQLError | object = new GraphQLError('');

    // Note: this test can also surface if you have 2 separate versions of GraphQL installed (which is bad)
    response = await createProject('');
    expect((response as GraphQLFixedError).message).toContain('Argument Validation Error');
    expect((response as GraphQLFixedError).validationErrors.key.minLength).toContain(
      'key must be longer'
    );

    response = await createProject('aaa-');
    expect((response as GraphQLError).message).toContain('Argument Validation Error');

    response = await createProject('-aaa');
    expect((response as GraphQLError).message).toContain('Argument Validation Error');

    response = await createProject('a--a');
    expect((response as GraphQLError).message).toContain('Argument Validation Error');

    response = await createProject('AAA');
    expect((response as GraphQLError).message).toContain('Argument Validation Error');

    response = await createProject('aa');
    console.log(response);
    console.log(JSON.stringify(response));
    expect(response).not.toBeInstanceOf(GraphQLError);

    response = await createProject('a-b');
    expect(response).not.toBeInstanceOf(GraphQLError);

    response = await createProject('foo-bar-bazzzzzzzzzzzzzzz');
    expect(response).not.toBeInstanceOf(GraphQLError);

    done();
  });
});

interface GraphQLFixedError {
  message: string;
  location: object[];
  path: string[];
  extenstions: {
    code: string;
    exception: object;
  };
  validationErrors: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

async function createProject(key: string): Promise<object | GraphQLFixedError> {
  let project;
  try {
    project = await binding.mutation.createProject(
      {
        data: {
          key,
          name: 'Fake name'
        }
      },
      `{ id name key }`
    );
  } catch (e) {
    return Promise.resolve(getBindingError(e));
  }

  return project;
}

/* eslint-enable no-console */
