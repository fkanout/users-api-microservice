import redis from 'redis';
import CONFIG from '../config';
import { User } from '../db/models/user';

export default class Publisher {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }
  private static instance: Publisher;
  static client: redis.RedisClient;

  static getInstance() {
    if (!Publisher.instance) {
      Publisher.client = redis.createClient({
        host: CONFIG.REDIS.HOST,
        port: CONFIG.REDIS.PORT,
        password: CONFIG.REDIS.PASSWORD
      })
      Publisher.instance = new Publisher();
    }
    return Publisher.instance;
  }

  publishUser(user: User, requestId: string) {
    const payload = {
      requestId,
      ...user
    }
    Publisher.client.publish('user', JSON.stringify(payload));

  }

}