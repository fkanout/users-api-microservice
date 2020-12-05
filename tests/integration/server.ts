import supertest from 'supertest';
import server from '../../src/server';

const request = supertest(server.listen());

describe('Server', () => {
  it('should respond for health check', async () => {
    await request
      .get('/healthCheck')
      .expect('Content-Type', /json/)
      .expect(200);
  });

});