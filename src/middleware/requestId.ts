import { Context } from 'koa';
import { v4 as uuidV4 } from 'uuid';

export default function genRequestId() {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async function (ctx: Context, next: () => Promise<unknown>) {
    ctx.state.requestId = ctx.header['X-Request-ID'] || uuidV4();
    await next();
  };
}
