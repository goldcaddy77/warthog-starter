import * as assert from 'assert';
import * as dotenv from 'dotenv';
const SnakeNamingStrategy = require('./src/core/type-graphql/SnakeNamingStrategy');

// Load environment variables
dotenv.config();
assert(process.env.TYPEORM_HOST);
assert(process.env.TYPEORM_PORT);
assert(process.env.TYPEORM_DATABASE);
assert(process.env.TYPEORM_LOGGING);

// If there is only one option, it should be passed as string, not array
let logging = String(process.env.TYPEORM_LOGGING).split(',');
if (logging.length === 1) {
  logging = logging[0];
}

module.exports = {
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  },
  database: process.env.TYPEORM_DATABASE,
  entities: ['src/**/*.entity.ts'],
  host: process.env.TYPEORM_HOST,
  logger: 'advanced-console',
  logging: 'all',
  migrations: ['src/migration/**/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
  port: parseInt(process.env.TYPEORM_PORT || '', 10),
  subscribers: ['src/subscriber/**/*.ts'],
  synchronize: true,
  type: 'postgres',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD
};
