const mongoose = require('mongoose');

const kanjiSchema = new mongoose.Schema({});

const Kanji = mongoose.model('Kanji', kanjiSchema);
module.exports = Kanji;
