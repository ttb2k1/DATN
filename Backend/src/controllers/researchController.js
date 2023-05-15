const {
  getKanjiByStrokeService,
  getKanjiBySearch,
} = require('../services/researchService');

const getListLesson = async (req, res) => {
  try {
    const listLesson = await getListLessonService();
    return res.status(200).json(listLesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postLesson = async (req, res) => {
  try {
    console.log(req.body);
    const { level, name } = req.body;
    const data = await postLessonService({ level, name });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVocab = async (req, res) => {
  try {
    const { kanji, mean, hiragana } = req.body;
    const vocab = await getKanjiBySearch({ kanji, mean, hiragana });
    return res.status(200).json(vocab);
  } catch (error) {
    res.status(500).json({ mressage: error.message });
  }
};

module.exports = {
  getListLesson,
  postLesson,
  getVocab
};
