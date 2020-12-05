import Koa from 'koa';
import { genericRouter, resourcesRouter } from './routers';
const app = new Koa();


app.use(genericRouter.routes());
app.use(resourcesRouter.routes());

export default app;

