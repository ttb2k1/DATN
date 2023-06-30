import axios from 'axios';

const BASE_URL = '';

class PracticeService {
  getVocabByName(name) {
    return axios.get(BASE_URL + 'search?name=' + name);
  }

  postCanvas(file) {
    return axios.post(BASE_URL + 'detect', file);
  }
}

export default new PracticeService();
