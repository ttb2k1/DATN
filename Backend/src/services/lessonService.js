const Lesson = require('../models/lessonModel');

const getListLessonService = async () => {
  return await Lesson.find({});
};

const postLessonService = async (data) => {
  return await Lesson.insertMany(data);
};

module.exports = { getListLessonService, postLessonService };
