import Koa from 'koa';
import { genericRouter, router } from './routers';

const app = new Koa();

app.use(router.routes());
app.use(genericRouter.routes());
app.use(router.allowedMethods());

export default app;

