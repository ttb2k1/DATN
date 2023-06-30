import axios from 'axios';

const BASE_URL = 'https://mazii.net/api/';

class LearnService {
  getListKanjiByLevel(level, pageNumber) {
    return axios.post(BASE_URL + 'jlptkanji', {
      query: level,
      language: 'vn',
      limit: '100',
      page: pageNumber,
    });
  }
}

export default new LearnService();
