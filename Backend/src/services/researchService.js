const Search = require('../models/researchModel');

const getKanjiByStrokeService = async (data) => {
  return await Search.find(data);
};

const postStrokeService = async () => {};

const getKanjiBySearch = async (data) => {
  return await Search.find(data);
};

module.exports = {
  getKanjiByStrokeService,
  postStrokeService,
  getKanjiBySearch,
};
