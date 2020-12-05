import { Context } from 'koa';
/* this is on app and routers 
and also it protects the app from 
un catch-ed async error and prevent the 
API from crashing.
*/
export default () => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (ctx: Context, next: () => Promise<unknown>) => {
    try {
      await next()
    } catch (err) {
      if (err.isJoi) {
        ctx.status = err.status
        ctx.body = {
          message: err.message
        }
      } else {
        console.log(err);
        ctx.throw(503, err)
      }
    }
  }
}
