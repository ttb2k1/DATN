const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  level: {
    type: String,
  },
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;
