import axios from 'axios';

const service = {
  getEvents: () => axios.get('/event')
};

export default service;
