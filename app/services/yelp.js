import axios from 'axios';
import querystring from 'querystring';
import { yelpConfig } from '../config/secrets';

var baseUrl = 'https://api.yelp.com/v3/';

class Yelpv3 {
  
  constructor() {
    
  }

 /* getAccessToken() {
    axios.post('https://api.yelp.com/oauth2/token',
        querystring.stringify({
          'client_id': yelpConfig.appId,
          'client_secret': yelpConfig.appSecret,
          'grant_type': 'client_credentials'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      .then(res => {
        this.accessToken = res.data.access_token;
        console.log('success ' + this.accessToken);
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };*/

  get(api, params) {

    return axios.post('//api.yelp.com/oauth2/token',
        querystring.stringify({
          'client_id': yelpConfig.appID,
          'client_secret': yelpConfig.appSecret,
          'grant_type': 'client_credentials'
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
      .then(res => {
        return axios.get(baseUrl + api, {
          params: params,
          headers: {
            'Authorization': 'Bearer ' + res.data.access_token
          }
        });
      })
      .catch(function(error) {
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
        return [];
      });
  }

  search(params) {
    return this.get('businesses/search', params);
  }

}

module.exports = Yelpv3;
