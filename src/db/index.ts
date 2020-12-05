import knex from 'knex';
import CONFIG from '../config'
import kenxConfig = require('../../knexfile');
import { User } from './models/user';

enum Tables {
  USERS = 'users'
}

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


  async createUser(newUser: User):
    Promise<User | undefined> {
    const { email, password, address, firstName } = newUser;
    try {
      const User: User[] =
        await DB
          .client(Tables.USERS)
          .insert({
            email,
            password,
            address,
            firstName,
          })
          .returning(['id', 'email', 'address', 'firstName']);
      return User.shift();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async getUsers(conditions: Map<string, string>):
    Promise<User[] | undefined> {
    try {
      const fetchedUser: User[] =
        await DB
          .client(Tables.USERS)
          .select(['id', 'email', 'address', 'firstName'])
          .where(conditions);

      return fetchedUser;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }


  async getUser(id: string):
    Promise<User[] | undefined> {
    try {
      const fetchedUser: User[] =
        await DB
          .client(Tables.USERS)
          .select(['id', 'email', 'address', 'firstName'])
          .where({ id });

      return fetchedUser
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  // Considering that password should be changed in a different way/function
  async updateUser(userData: User, id: string):
    Promise<User | undefined> {
    try {
      const updatedUser: User[] =
        await DB
          .client(Tables.USERS)
          .where({ id })
          // Using spread operator to update ONLY
          // the felids are provided by the user
          // So it could be a full or a partial update as requested.
          .update({ ...userData })
          .returning(['id', 'email', 'address', 'firstName']);
      return updatedUser.shift();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async deleteUser(id: string):
    Promise<boolean> {
    try {
      const deletedUser: boolean =
        await DB
          .client(Tables.USERS)
          .where({ id })
          .delete();
      return deletedUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}


