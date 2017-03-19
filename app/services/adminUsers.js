import axios from 'axios';

const service = {
  getUsers: () => axios.get('/users')
};

export default service;
