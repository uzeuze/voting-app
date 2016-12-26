const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/voting-app-211216_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, polls } = mongoose.connection.collections;
  users.drop(() => {
    polls.drop(() => {
      done();
    });
  });
});
