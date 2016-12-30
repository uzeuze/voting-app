const mongoose = require('mongoose');
const friendly = require('mongoose-friendly');

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

pollSchema.plugin(friendly, {
  source: 'question',  // Attribute to generate the friendly version from.
  friendly: 'slug', // Attribute to set the friendly version of source.
  update: false,    // Updates friendly field on subsequent saves.
  addIndex: true,   // Sets {unique: true} as index for the friendly attribute.
  findById: true    // Turns findById into an alias for findByFriendly.
});

module.exports = mongoose.model('Poll', pollSchema);
