import axios from 'axios';

const service = {
  getOnlineToys: () => axios.get('/onlinetoys'),
  getCategories: () => axios.get('/toys/categories'),
  getTags: () => axios.get('/toys/tags')
};

export default service;
