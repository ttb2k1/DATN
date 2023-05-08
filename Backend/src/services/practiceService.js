const Practice = require('../models/practiceModel');
const Lesson = require('../models/lessonModel');

const getListLessonService = async () => {
  return await Lesson.find({});
};

module.exports = { getListLessonService };
