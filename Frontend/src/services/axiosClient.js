import axios from 'axios';

const EXPO_URI = 'http://localhost:5000/api/v1';

const axiosClient = axios.create({
  baseURL: EXPO_URI,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
