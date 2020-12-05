import * as dotenv from 'dotenv';
dotenv.config();
import CONFIG from './src/config';

export = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },
  development: {
    client: 'pg',
    version: '7.2',
    connection: {
      host: CONFIG.DB.HOST,
      user: CONFIG.DB.USER_NAME,
      port: CONFIG.DB.PORT,
      password: CONFIG.DB.PASSWORD,
      database: CONFIG.DB.DB_NAME
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
