import axios from 'axios';

const baseUrl = 'https://api.foursquare.com/v2/';

//venues/search?ll=40.7,-74&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=YYYYMMDD

class Foursquare {

  constructor(opts) {
    this.appId = opts.app_id;
    this.appSecret = opts.app_secret;
  }

  searchVenues(location) {
    return axios.get(baseUrl + 'venues/search', {
        params: {
          client_id: this.appId,
          client_secret: this.appSecret,
          near: location,
          categoryId: '4d4b7105d754a06376d81259',
          limit: 30,
          v: '20170124'
        }});
  }

}


module.exports = Foursquare;
