import { IRouterContext } from 'koa-router';
import DB from '../db';
import { User } from '../db/models/user';

export default class UsersController {

  static async createUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {

    const db = DB.getInstance();
    const { firstName, email, address }: User = ctx.request.body;
    const user: User = {
      firstName: firstName?.toLowerCase(),
      email: email?.toLowerCase(),
      address: address?.toLowerCase(),
      password: ctx.state.hashedPassword,
    };
    const createdUser = await db.createUser(user);
    ctx.assert(createdUser, 500, 'Error - UsersController.createUser');
    ctx.body = createdUser;
    await next();

  }

  static async getUsers(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    const db = DB.getInstance();
    ctx.body = await db.getUsers(ctx.query);
    await next();
  }

  static async getUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    ctx.body = {
      handler: 'getUser'
    }
    await next();
  }

  static async deleteUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    ctx.status = 204;
    await next();
  }

  static async updateUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    ctx.body = {
      handler: 'updateUser'
    }
    await next();
  }

}
