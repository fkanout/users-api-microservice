import knex from 'knex';
import CONFIG from '../config'
import kenxConfig = require('../../knexfile');

// DB is a singleton class (Service)
export default class DB {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }
  private static instance: DB;
  static client: knex;

  static getInstance(): DB {
    if (!DB.instance) {
      const config = kenxConfig.default[CONFIG.ENV]
      DB.client = knex(config);
      DB.instance = new DB();
    }
    return DB.instance;
  }
}


