const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({});

const Practice = mongoose.model('Search', practiceSchema);
module.exports = Practice;
