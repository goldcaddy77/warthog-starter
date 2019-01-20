import 'reflect-metadata';

import * as dotenv from 'dotenv';
import * as Faker from 'faker';
import { Container } from 'typedi';

dotenv.config();

import { getApp } from '../src/app';
import { UserStatus } from '../src/user.model';

if (process.env.NODE_ENV !== 'development') {
  throw 'Seeding only available in development environment';
  process.exit(1);
}

const NUM_USERS = 100;

async function seedDatabase() {
  const app = getApp({ container: Container });
  await app.start();

  const binding = await app.getBinding();

  for (let index = 0; index < NUM_USERS; index++) {
    const random = new Date()
      .getTime()
      .toString()
      .substring(8, 13);
    const firstName = Faker.name.firstName();
    const lastName = Faker.name.lastName();
    const email = `${firstName
      .substr(0, 1)
      .toLowerCase()}${lastName.toLowerCase()}-${random}@fakeemail.com`;
    const status = Math.random() > 0.2 ? UserStatus.ACTIVE : UserStatus.INACTIVE;

    try {
      const user = await binding.mutation.createUser(
        {
          data: {
            email,
            firstName,
            lastName,
            status
          }
        },
        `{ id email createdAt createdById }`
      );

      console.log(user.email);
    } catch (error) {
      console.error(email, error);
    }
  }

  return app.stop();
}

seedDatabase()
  .then(result => {
    console.log(result);
    return process.exit(0);
  })
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
