const { getListLessonService } = require('../services/practiceService');

const getListLesson = async (req, res) => {
  try {
    const listLesson = await getListLessonService();
    return res.status(200).json(listLesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListLesson,
};
