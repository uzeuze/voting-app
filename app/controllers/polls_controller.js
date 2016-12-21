const Poll = require('../models/poll');

exports.getPolls = (req, res) => {
  Poll.find({}, (err, polls) => {
    if(err) { return res.status(404).send(err); }
    if(polls && polls.length) {
      res.json(polls);
    } else {
      res.status(404).send('Invalid Request');
    }
  });
}

exports.createPoll = (req, res) => {
  let question = req.body.question;

  // Return error if inputs are invalid
  if(!question || !req.body.options || req.body.options.length < 2) {
    return res.send(422).json({ error: 'Invalid input' });
  }

  let options = req.body.options.map((option, i) => {
    return { optionId: i, text: option }
  });

  const newPoll = new Poll({
    question: question,
    options: options,
    creator: req.user.email
  });

  newPoll.save((err) => {
    if(err) { throw new Error(err); }
    res.json(newPoll);
  });
}
