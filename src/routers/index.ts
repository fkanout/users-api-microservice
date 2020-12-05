import Router from 'koa-router';
import validate, { Joi } from 'koa-router-joi-validation';
import { hashPassword } from '../middleware';
import onlyFromSwiss from '../middleware/onlyFromSwiss';
import UserController from './users';

const genericRouter = new Router();
const router = new Router({
  prefix: process.env.USERS_API_PREFIX || '/api/v1',
});

// Resources router, which could be protected & behind a base URL prefix 
router.post(
  '/users',
  validate({
    body: {
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      password: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  onlyFromSwiss,
  hashPassword,
  UserController.createUser
)

router.get(
  '/users',
  validate({
    query: {
      email: Joi.string().email(),
      firstName: Joi.string(),
      address: Joi.string()
    }
  }),
  UserController.getUsers
)

router.get(
  '/users/:id',
  validate({
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
    }
  }),
  UserController.getUser
)


router.patch(
  '/users/:id',
  validate({
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
    },
    body: {
      email: Joi.string().email(),
      firstName: Joi.string(),
      address: Joi.string()
    }
  }),
  UserController.updateUser
)



router.delete(
  '/users/:id',
  validate({
    params: {
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
    }
  }),
  UserController.deleteUser
)

// Generic/Service router.
genericRouter.get('/healthCheck', async (ctx, next) => {
  ctx.body = {
    success: true,
  };
  await next();
});


export { router, genericRouter };
