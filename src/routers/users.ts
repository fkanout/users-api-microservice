import { assert } from 'console';
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
    const db = DB.getInstance();
    const user = await db.getUser(ctx.params.id);
    ctx.assert(user, 500, 'Error - UsersController.getUser');
    ctx.body = user?.shift();
    await next();
  }

  static async deleteUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    const db = DB.getInstance();
    const isDeleted = await db.deleteUser(ctx.params.id);
    console.log(isDeleted);
    assert(isDeleted, 500, 'UsersController.deleteUser')
    ctx.status = 204;
    await next();
  }

  static async updateUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    const userData: User = ctx.request.body;
    const db = DB.getInstance();
    const updatedUser = await db.updateUser(userData, ctx.params.id);
    ctx.assert(updatedUser, 500, 'Error - UsersController.updateUser');
    ctx.body = updatedUser;
    await next();
  }

}
