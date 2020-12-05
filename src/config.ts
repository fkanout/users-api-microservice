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
  },
  REDIS: {
    HOST: process.env.USERS_API_REDIS_HOST,
    PORT: parseInt(process.env.USERS_API_REDIS_PORT || '6379'),
    PASSWORD: process.env.USERS_API_REDIS_PASSWORD,
  }
}
export default CONFIG;