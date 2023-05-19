const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
  kanji: {
    type: String,
    required: true,
  },
  vocabulary: {
    type: String,
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

const Detail = mongoose.model('Detail', researchSchema);
module.exports = Detail;
