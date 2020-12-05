import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import { requestId, errorHandler } from './middleware'
import { genericRouter, router } from './routers';

const app = new Koa();

app.use(errorHandler());
app.use(helmet());
app.use(cors());
app.use(requestId())
app.use(bodyParser());
app.use(router.routes());
app.use(genericRouter.routes());
app.use(router.allowedMethods());

export default app;

