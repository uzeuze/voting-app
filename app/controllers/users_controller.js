const Poll = require('../models/poll');

exports.getCurrentUserPolls = (req, res) => {
  let email = req.user.email;
  Poll.find({ creator: email }, (err, polls) => {
    if(err) { return res.status(404).send(err); }
    res.json(polls);
  });
}
