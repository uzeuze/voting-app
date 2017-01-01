const Poll = require('../models/poll');

exports.getPolls = (req, res) => {
  Poll.find({}, (err, polls) => {
    if (err) { return res.status(404).send(err); }
    if (polls && polls.length) {
      res.json(polls);
    } else {
      res.json({ error: 'No polls' });
    }
  });
};

exports.createPoll = (req, res) => {
  const question = req.body.question;

  // Return error if inputs are invalid
  if (!question || !req.body.options || req.body.options.length < 2) {
    return res.send(422).json({ error: 'Invalid input' });
  }

  const options = req.body.options.map((option, i) => {
    return { optionId: i, text: option };
  });

  const newPoll = new Poll({
    question,
    options,
    creator: req.user.email
  });

  newPoll.save((err) => {
    if (err) { throw new Error(err); }
    res.json(newPoll);
  });
};


exports.getPoll = (req, res) => {
  const pollId = req.params.pollId;
  // Finds poll by friendly id
  Poll.findById(pollId, (err, poll) => {
    if (err) { return res.status(404).send(err); }
    if (poll) {
      res.json(poll);
    } else {
      res.status(404).send('Invalid request');
    }
  });
};

exports.votePoll = (req, res) => {
  const pollId = req.params.pollId;
  const option = req.body.option;
  let voter;
  if (req.user) {
    voter = req.user.email;
  } else {
    voter = req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress;
  }
  Poll.findOne({ slug: pollId }, (err, poll) => {
    if (err) { throw new Error(err); }
    if (option.id >= poll.options.length) {
      return res.json({ error: 'Invalid request' });
    } else if (poll.voters.indexOf(voter) !== -1) {
      return res.json({ error: 'You have already voted' });
    }
    // Create new option if text exists
    if (option.text) {
      const nextId = poll.options.length;
      poll.options.push({ optionId: nextId, text: option.text, voteCount: 1 });
      poll.voters.push(voter);
    } else {
      // increment vote count of given option
      for (let i = 0; i < poll.options.length; i++) {
        if (poll.options[i].optionId == option.id) {
          poll.options[i].voteCount += 1;
          poll.voters.push(voter);
        }
      }
    }
    poll.save((error) => {
      if (error) { throw new Error(error); }
      res.json(poll);
    });
  });
};

exports.deletePoll = (req, res) => {
  const pollId = req.params.pollId;
  Poll.findOne({ slug: pollId }, (err, poll) => {
    if (err) { throw new Error(err); }
    // Return error if user is not the creator of the poll
    if (poll.creator !== req.user.email) {
      return res.status(404).send('You are not authorized to delete this poll');
    }
    poll.remove((error) => {
      if (error) { throw new Error(error); }
      res.send('Poll deleted');
    });
  });
};
