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

const CONFIG: IConfig = {
  ENV: process.env.NODE_ENV || 'development',
  USERS_API_PORT: process.env.USERS_API_PORT || '3000', // To satisfy the interface, plus, all ENV variables are string, the server will parse it's value to string
  USERS_API_PREFIX: process.env.USERS_API_PREFIX || '/api/v1',
  DB: {
    HOST: process.env.USERS_API_DB_HOST,
    USER_NAME: process.env.USERS_API_DB_USER_NAME,
    PASSWORD: process.env.USERS_API_DB_PASSWORD,
    DB_NAME: process.env.USERS_API_DB_DB_NAME,
    PORT: process.env.USERS_API_DB_DB_PORT,
  }
}
export default CONFIG;