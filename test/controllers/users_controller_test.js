const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = mongoose.model('User');
const Poll = mongoose.model('Poll');

describe('Users controller', () => {
  it('Get to /api//user/polls returns current users polls', done => {
    request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: '123456'
      })
      .end((error, response) =>{
        testPoll = new Poll({
          question: 'What is your favourite color?',
          options: [
            { optionId: 0, text: 'red' },
            { optionId: 1, text: 'green' },
            { optionId: 2, text: 'blue' }
          ],
          creator: 'test@example.com',
        });
        testPoll.save()
          .then(() => {
            request(app)
              .get('/api/user/polls')
              .set({ "Authorization": response.body.token })
              .end((err, res) => {
                assert(res.body.length === 1);
                done();
              });
          });
      });
  });
});
