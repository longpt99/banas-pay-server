var supertest = require('supertest');

describe('UserController.login', () => {
  describe('POST /api/auth/login', () => {
    it('should response error no basic token', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .send({ name: 'longxxx', password: 'long123' })
        .expect(401, { msg: 'You must send an Authorization header' })
        .end(done);
    });
    it('should response error token not basic type', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', '4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ name: 'longxxx', password: 'long123' })
        .expect(401, { msg: 'Expected a Basic token' })
        .end(done);
    });
    it('should response error with invalid basic token', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-a8f2-714af51fe80a')
        .send({ name: 'longxxx', password: 'long123' })
        .expect(404, { msg: 'Client not found' })
        .end(done);
    });
    it('should response error with no username field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ password: 'long123' })
        .expect(404, { msg: 'Error' })
        .end(done);
    });
    it('should response error with wrong username field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ username: 'long', password: 'long123' })
        .expect(404, { msg: 'User not found' })
        .end(done);
    });
    it('should response error with no password field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ username: 'longxxx' })
        .expect(404, { msg: 'Error' })
        .end(done);
    });
    it('should response error with wrong password field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ username: 'longxxx', password: 'long12' })
        .expect(404, { msg: 'Invalid password' })
        .end(done);
    });
    it('should response token', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ username: 'longxxx', password: 'long123' })
        .expect(200)
        .end(done);
    });
  });
});
