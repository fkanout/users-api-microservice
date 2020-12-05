import supertest from 'supertest';
import server from '../../src/server';

const request = supertest(server.listen());

describe('Users routers', () => {

  describe('POST /users', () => {
    it('should respond with the added user', async () => {
      await request
        .post('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  })
  describe('GET /users', () => {
    it('should respond with a list of users', async () => {
      await request
        .get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  })

  describe('GET /users/:id', () => {
    it('should respond with a specific user', async () => {
      await request
        .get('/api/v1/users/00000001')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  })

  describe('DELETE /users/:id', () => {
    it('should respond with empty content', async () => {
      await request
        .delete('/api/v1/users/00000001')
        .expect(204);
    });
  })

  describe('PATCH /users/:id', () => {
    it('should respond with the updated user', async () => {
      await request
        .patch('/api/v1/users/00000001')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  })
});