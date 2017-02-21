import axios from 'axios';

const service = {
  getNews: () => axios.get('/news')
};

export default service;
