import axios from 'axios';

const service = {
  getUsers: () => axios.get('/users'),
  getUsersByName: (value) => axios.get('/users/'+value)
};

export default service;
