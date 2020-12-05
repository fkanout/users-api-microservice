import { IRouterContext } from 'koa-router';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user';

const hashPasswordWithSalt =
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async (ctx: IRouterContext, next: () => Promise<unknown>) => {
    const { password }: User = ctx.request.body;
    ctx.state.hashedPassword = await bcrypt.hash(password, 10);
    await next();
  };

export default hashPasswordWithSalt