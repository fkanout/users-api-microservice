import { IRouterContext } from 'koa-router';

export default class UsersController {

  static async createUser(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    ctx.body = {
      handler: 'getUsers'
    }
    await next();
  }

  static async getUsers(ctx: IRouterContext, next: () => Promise<void>): Promise<void> {
    ctx.body = {
      handler: 'getUsers'
    }
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
