import Router from 'koa-router';

const genericRouter = new Router();

const resourcesRouter = new Router({
  prefix: process.env.USERS_API_PREFIX || '/api/v1',
});


genericRouter.get('/healthCheck', async (ctx, next) => {
  ctx.body = {
    success: true,
  };
  await next();
});


export { resourcesRouter, genericRouter };
