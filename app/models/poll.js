const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  question: { type: String, required: true },
  options: [{
    optionId: { type: Number, required: true },
    text: { type: String, required: true },
    voteCount: { type: Number, default: 0 }
  }],
  creator: { type: String, required: true },
  voters: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', pollSchema);
