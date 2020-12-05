import server from './server';
const port = process.env.USERS_API_PORT || 3000;
server.listen(port, () => console.log('server is up...'))


