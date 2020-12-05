import Router from 'koa-router';
import UserController from './users';

const genericRouter = new Router();
const router = new Router({
  prefix: process.env.USERS_API_PREFIX || '/api/v1',
});

// Resources router, which could be protected & behind a base URL prefix 
router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:id', UserController.getUser)
router.patch('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

// Generic/Service router.
genericRouter.get('/healthCheck', async (ctx, next) => {
  ctx.body = {
    success: true,
  };
  await next();
});


export { router, genericRouter };
