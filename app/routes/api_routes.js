const express = require('express');
const router = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const authenticationController = require('../controllers/authentication_controller');
const pollsController = require('../controllers/polls_controller');
require('../services/passport');

router.get('/', requireAuth, (req, res) => {
  res.send('hi');
});

// Poll
router.post('/polls', requireAuth, pollsController.createPoll);


//Authentication
router.post('/signin', requireSignin, authenticationController.signin)
router.post('/signup', authenticationController.signup);

module.exports = router;
