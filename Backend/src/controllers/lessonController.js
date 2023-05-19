const { postLessonService } = require('../services/lessonService');

const lessonController = {
  getListLesson : async (req, res) => {
    try {
      const listLesson = await getListLessonService();
      return res.status(200).json(listLesson);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  postLesson: async (req, res) => {
    try {
      console.log(req.body);
      const { level, name } = req.body;
      const data = await postLessonService({ level, name });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = lessonController
