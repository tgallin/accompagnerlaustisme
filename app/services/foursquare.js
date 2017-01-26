import axios from 'axios';
import { foursquareConfig } from '../config/secrets';


const baseUrl = 'https://api.foursquare.com/v2/';

//venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD

const service = {
  searchVenues: (location) => {
    return axios.get(baseUrl + 'venues/search', {
        params: {
          client_id: foursquareConfig.appID,
          client_secret: foursquareConfig.appSecret,
          near: location,
          categoryId: '4d4b7105d754a06376d81259',
          limit: 30,
          v: '20170124'
        }});
  }
};

export default service;
