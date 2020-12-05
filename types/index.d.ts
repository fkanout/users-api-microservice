interface IDBConfig {
  HOST: string | undefined,
  USER_NAME: string | undefined,
  PASSWORD: string | undefined,
  DB_NAME: string | undefined
  PORT: string | undefined
}
interface IConfig {
  ENV: string;
  USERS_API_PORT: string | undefined;
  USERS_API_PREFIX: string | undefined;
  DB: IDBConfig
}