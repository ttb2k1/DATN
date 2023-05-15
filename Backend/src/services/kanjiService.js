const Kanji = require('../models/learnModel');
const Lesson = require('../models/lessonModel');

const getListLessonService = async () => {
  return await Lesson.find({});
};

module.exports = {
  getListLessonService,
};
