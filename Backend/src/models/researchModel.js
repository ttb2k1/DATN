const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  hiragana: {
    type: String,
    required: true,
  },
  mean: {
    type: String,
  },
  vocabulary: {
    type: String,
  },
  mean: {
    type: String,
  }
});

const Research = mongoose.model('Research', researchSchema);
module.exports = Research;
