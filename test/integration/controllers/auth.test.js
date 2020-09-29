const supertest = require('supertest');
const assert = require('assert');
describe('Auth', () => {
  describe('POST /api/auth/login', () => {
    it('should response error no basic token', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .send({ phone: '0123456786', password: 'long123' })
        .expect(401)
        .expect((response) => {
          assert(
            response.body.message,
            'You must send an Authorization header'
          );
        })
        .end(done);
    });
    it('should response error token not basic type', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', '4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ phone: '0123456786', password: 'long123' })
        .expect(401)
        .expect((response) => {
          assert(response.body.message, 'Expected a Basic token');
        })
        .end(done);
    });
    it('should response error with invalid basic token', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-a8f2-714af51fe80a')
        .send({ phone: '0123456786', password: 'long123' })
        .expect(404)
        .expect((response) => {
          assert(response.body.message, 'Client not found');
        })
        .end(done);
    });
    it('should response error with no username field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ password: 'long123' })
        .expect(404)
        .expect((response) => {
          assert(response.body.message, 'All field is required');
        })
        .end(done);
    });
    it('should response error with wrong username field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ phone: '0123', password: 'long123' })
        .expect(404)
        .expect((response) => {
          assert(response.body.message, 'User not found');
        })
        .end(done);
    });
    it('should response error with no password field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ phone: '0123456786' })
        .expect(404)
        .expect((response) => {
          assert(response.body.message, 'All field is required');
        })
        .end(done);
    });
    it('should response error with wrong password field', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ phone: '0123456786', password: 'long12' })
        .expect(404)
        .expect((response) => {
          assert(response.body.message, 'Invalid password');
        })
        .end(done);
    });
    it('should response token', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .set('Authorization', 'Basic 4f0235d3-3acd-470c-a8f2-714af51fe80a')
        .send({ phone: '0123456786', password: 'long123' })
        .expect(200)
        .expect((response) => {
          assert(response.body.message, 'Login successful');
        })
        .end(done);
    });
  });
  describe('POST /api/auth/register', () => {
    it('should response error no basic token', (done) => {
      supertest(sails.hooks.http.app)
        .post('/api/auth/login')
        .send({ phone: '0123456786' })
        .expect(401)
        .expect((response) => {
          assert(
            response.body.message,
            'You must send an Authorization header'
          );
        })
        .end(done);
    });
  });
});
