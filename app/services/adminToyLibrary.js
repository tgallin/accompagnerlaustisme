import axios from 'axios';

const service = {
  getToys: () => axios.get('/toys'),
  getMyToys: () => axios.get('/mytoys'),
  getCategories: () => axios.get('/toys/categories'),
  getTags: () => axios.get('/toys/tags'),
  getToyLibraries: () => axios.get('/toys/toyLibraries')
};

export default service;
