

import assert from 'assert';
import supertest from 'supertest';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import server from '../../src/server';
import { expectCt } from 'koa-helmet';


const testDBPath = './dev.sqlite3';
const request = supertest(server.listen());

describe('Users routers', () => {
  before(async () => {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(testDBPath);
      db.run(` 
      CREATE TABLE users(
        id INTEGER PRIMARY KEY,
        firstName TEXT NOT NULL,
        address TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );`, (error) => {
        if (error) {
          console.log(error);
          reject(error)
        }
        resolve();
      });
    });
  });

  describe.skip('POST /users', () => {
    it('should respond with the added user', async () => {
      await request
        .post('/api/v1/users')
        .send({
          'email': 'faisal@kanout.com',
          'password': 'superpassword',
          'firstName': 'faisal',
          'address': '15 RUE LEFEBVRE'
        })
        .expect('Content-Type', /json/)

        .expect(200)
    });
  })

  describe('GET /users', () => {
    it('should respond with a list of users', async () => {
      await request
        .get('/api/v1/users')
        .expect('Content-Type', /json/)

    });
  })
  //TODO: get userId from created tests
  describe.skip('GET /users/:id', () => {
    it('should respond with a specific user', async () => {
      await request
        .get('/api/v1/users/00000001')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  })

  //TODO: get userId from created tests

  describe.skip('DELETE /users/:id', () => {
    it('should respond with empty content', async () => {
      await request
        .delete('/api/v1/users/00000001')
        .expect(204);
    });
  })

  //TODO: get userId from created tests
  describe.skip('PATCH /users/:id', () => {
    it('should respond with the updated user', async () => {
      await request
        .patch('/api/v1/users/00000001')
        .send({
          'email': 'faisal@kanout.com',
        })
        .expect('Content-Type', /json/)
        .expect(200);
    });
  })


  after(async () => {
    return new Promise((resolve, reject) => {
      fs.unlink(testDBPath, (error) => {
        if (error) {
          reject(error)
        }
        resolve()
      })

    })
  });

});