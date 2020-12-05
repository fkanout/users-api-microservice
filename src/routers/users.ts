import { IRouterContext } from 'koa-router';
import DB from '../db';
import { User } from '../db/models/user';
import { Publisher } from '../services';

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
    const pub = Publisher.getInstance();
    pub.publishUser(createdUser, ctx.state.requestId);
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
    ctx.assert(isDeleted, 500, 'UsersController.deleteUser')
    // assert is only if there is an error 
    // the if is to check if the user is deleted or not (don't exists)
    if (!isDeleted) {
      ctx.status = 404;
      return;
    }
    ctx.status = 204;
    const pub = Publisher.getInstance();
    const deletedUser: User = {
      id: ctx.params.id
    }
    pub.publishUser(deletedUser, ctx.state.requestId);
    await next();
  }


  static async updateUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    const userData: User = ctx.request.body;
    const db = DB.getInstance();
    const updatedUser = await db.updateUser(userData, ctx.params.id);
    ctx.assert(updatedUser, 500, 'Error - UsersController.updateUser');
    ctx.body = updatedUser;
    const pub = Publisher.getInstance();
    pub.publishUser(updatedUser, ctx.state.requestId);
    await next();
  }

}
