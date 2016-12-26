const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = mongoose.model('User');

describe('Authentication controller', () => {
  it('Post to /api/signup creates a new user', done => {
    request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: '123456'
      })
      .end((err, response) =>{
        assert(response.body.token !== undefined);
        done();
      });
  });

  it('Post to /api/signin signins user', done => {
    const newUser = new User({
      email: 'test@example.com',
      password: '123456'
    });

    newUser.save()
      .then(() => {
        request(app)
          .post('/api/signin')
          .send({
            email: 'test@example.com',
            password: '123456'
          })
          .end((err, response) => {
            assert(response.body.token !== undefined);
            done();
          });
      });
  });
});
