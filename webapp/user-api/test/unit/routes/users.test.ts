import request from 'supertest';

import app from '../../../src/app';

describe('/users', () => {
  describe('get', () => {
    it('normal', async () => {
      await request(app)
        .get('/users')
        .expect(200);
    });
  });
});
