import axios from 'axios';

const service = {
  getToys: () => axios.get('/toys'),
  getToysByNameOrRef: (value) => axios.get('/toys/nameOrRef/'+value),
  getMyToys: () => axios.get('/mytoys'),
  getCategories: () => axios.get('/toys/categories'),
  getTags: () => axios.get('/toys/tags'),
  getToyLibraries: () => axios.get('/toys/toylibraries'),
  getToyBookings: () => axios.get('/toys/bookings'),
  getMyToyBookings: () => axios.get('/mytoybookings')
};

export default service;
