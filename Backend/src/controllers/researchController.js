const researchService = require('../services/researchService');

const researchController = {
  getVocabByStroke: async (req, res) => {
    try {
      const result = await researchService.getVocabByStroke(req.file.path);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  postFileExcel: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ messsage: error.message });
    }
  },

  getVocabBySearch: async (req, res) => {
    try {
      const name = req.params.vocab;
      if (!name) {
        return res.status(200).json('No Data');
      } else {
        const result = await researchService.getVocabBySearch(name);
        return res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // getListLesson = async (req, res) => {
  //   try {
  //     const listLesson = await getListLessonService();
  //     return res.status(200).json(listLesson);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  // postLesson = async (req, res) => {
  //   try {
  //     console.log(req.body);
  //     const { level, name } = req.body;
  //     const data = await postLessonService({ level, name });
  //     return res.status(200).json(data);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  getVocab: async (req, res) => {
    try {
      const { kanji, mean, hiragana } = req.body;
      const vocab = await researchService.getKanjiBySearch({
        kanji,
        mean,
        hiragana,
      });
      return res.status(200).json(vocab);
    } catch (error) {
      res.status(500).json({ mressage: error.message });
    }
  },
};

module.exports = researchController;
