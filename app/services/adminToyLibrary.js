import axios from 'axios';

const service = {
  getToys: () => axios.get('/toys'),
  getCategories: () => axios.get('/toys/categories'),
  getTags: () => axios.get('/toys/tags')
};

export default service;
