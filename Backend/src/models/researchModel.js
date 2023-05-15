const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  kanji: {
    type: String,
    required: true,
  },
  onyomi: {
    type: String,
  },
  kunyomi: {
    type: String,
  },
  mean: {
    type: String,
  },
  level: {
    type: String,
  },
});

const Research = mongoose.model('Research', researchSchema);
module.exports = Research;
