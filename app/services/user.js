import axios from 'axios';

const service = {
  getUser: () => axios.get('/user')
};

export default service;
