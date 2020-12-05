import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import { genericRouter, router } from './routers';

const app = new Koa();

app.use(helmet());
app.use(cors());
app.use(router.routes());
app.use(genericRouter.routes());
app.use(router.allowedMethods());

export default app;

