const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Poll = mongoose.model('Poll');


describe('Polls Controller', () => {
  let testPoll;

  beforeEach((done) => {
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
      .then(() => done());
  });

  it('Get to /api/polls finds polls', done => {
    request(app)
      .get('/api/polls')
      .end((err, response) => {
        assert(response.body.length === 1);
        assert(response.body[0].creator === 'test@example.com');
        done();
      });
  });

  it('Get to /api/polls/what-is-your-favourite-color finds correct poll', done => {
    request(app)
      .get('/api/polls/what-is-your-favourite-color')
      .end((err, response) => {
        assert(response.body.question === 'What is your favourite color?');
        done();
      });
  });

  it('Post to /api/polls creates a new poll', done => {
    request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: '123456'
      })
      .end((error, response) =>{
        request(app)
          .post('/api/polls')
          .set({ "Authorization": response.body.token })
          .send({
            "question": "Who will win?",
          	"options": ["superman", "batman"]
          })
          .end((err, res) => {
            assert(res.body.question === "Who will win?");
            done();
          });
      });
  });

  it('Post to /api/polls/what-is-your-favourite-color with option id, increments vote count of given option', done => {
    request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: '123456'
      })
      .end((error, response) =>{
        request(app)
          .post('/api/polls/what-is-your-favourite-color')
          .set({ "Authorization": response.body.token })
          .send({
            "option": { "id": "0" }
          })
          .end((err, res) => {
            assert(res.body.options[0].voteCount === 1);
            done();
          });
      });
  });

  it('Post to /api/unauth/polls/what-is-your-favourite-color with option id, increments vote count of given option', done => {
    request(app)
      .post('/api/unauth/polls/what-is-your-favourite-color')
      .send({
        "option": { "id": "0" }
      })
      .end((err, res) => {
        assert(res.body.options[0].voteCount === 1);
        done();
      });
  });

  it('Post to /api/polls/what-is-your-favourite-color with option text, adds new option', done => {

    request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: '123456'
      })
      .end((error, response) =>{
        request(app)
          .post('/api/polls/what-is-your-favourite-color')
          .set({ "Authorization": response.body.token })
          .send({
            "option": { "text": "orange" }
          })
          .end((err, res) => {
            assert(res.body.options.length === testPoll.options.length + 1);
            assert(res.body.options[res.body.options.length -1].text === 'orange');
            done();
          });
      });
  });

  it('Delete to /api/polls/what-is-your-favourite-color deletes the record', done => {
    request(app)
      .post('/api/signup')
      .send({
        email: 'test@example.com',
        password: '123456'
      })
      .end((error, response) =>{
        request(app)
          .delete('/api/polls/what-is-your-favourite-color')
          .set({ "Authorization": response.body.token })
          .end(() => {
            Poll.findOne({ slug: 'what-is-your-favourite-color'})
              .then((poll) => {
                assert(poll === null);
                done();
              });
          });
      });
  });
});
