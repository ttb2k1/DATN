const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({});

const Search = mongoose.model('Search', searchSchema);
module.exports = Search;
