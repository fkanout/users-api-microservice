import * as dotenv from 'dotenv';
dotenv.config();

import server from './server'
import CONFIG from './config';


server.listen(
  CONFIG.USERS_API_PORT,
  () => console.log('Server is up | Port:', CONFIG.USERS_API_PORT))


