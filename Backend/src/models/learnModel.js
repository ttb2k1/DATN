const mongoose = require('mongoose');

const kanjiLearnSchema = new mongoose.Schema({});

const Kanji = mongoose.model('Kanji', kanjiLearnSchema);
module.exports = Kanji;
