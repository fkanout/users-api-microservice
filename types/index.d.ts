interface IDBConfig {
  HOST: string | undefined
  USER_NAME: string | undefined
  PASSWORD: string | undefined
  DB_NAME: string | undefined
  PORT: string | undefined
}
interface IRedisConfig {
  HOST: string | undefined
  PASSWORD: string | undefined
  PORT: number | undefined
}
interface IConfig {
  ENV: string;
  USERS_API_PORT: string | undefined
  USERS_API_PREFIX: string | undefined
  DB: IDBConfig
  REDIS: IRedisConfig
}


declare module 'koa-router-joi-validation' {
  export { default as Joi } from '@hapi/joi';
  export default
    function validate(ctx: IRouterContext);

}
