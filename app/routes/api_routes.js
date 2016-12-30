const express = require('express');
const passport = require('passport');

const router = express.Router();
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
router.post('/polls/:pollId', requireAuth, pollsController.votePoll);
// Unauthorized client vote
router.post('/unauth/polls/:pollId', pollsController.votePoll);
router.delete('/polls/:pollId', requireAuth, pollsController.deletePoll);

// User
router.get('/user/polls', requireAuth, usersController.getCurrentUserPolls);

//Authentication
router.post('/signin', requireSignin, authenticationController.signin);
router.post('/signup', authenticationController.signup);

module.exports = router;
