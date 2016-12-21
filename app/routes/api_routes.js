const express = require('express');
const router = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const authenticationController = require('../controllers/authentication_controller');
const pollsController = require('../controllers/polls_controller');
const usersController = require('../controllers/users_controller');
require('../services/passport');

// Poll
router.get('/polls', pollsController.getPolls);
router.post('/polls', requireAuth, pollsController.createPoll);
router.get('/polls/:pollId', pollsController.getPoll);

// User
router.get('/user/polls', requireAuth, usersController.getCurrentUserPolls);

//Authentication
router.post('/signin', requireSignin, authenticationController.signin)
router.post('/signup', authenticationController.signup);

module.exports = router;
