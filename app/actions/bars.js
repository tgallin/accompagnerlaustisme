/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import axios from 'axios';
import * as types from '../types';

import YelpApiCaller from '../services/yelp';

var yelpApiCaller = new YelpApiCaller();

const category_bars = 'bars';

polyfill();

export function makeGoingRequest(id, data, api = '/going') {
  return axios.get(api + (id ? ('/' + id) : ''), {
    params: data
  });
}

export function typing(text) {
  return {
    type: types.TYPING_LOCATION,
    newLocation: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function requestBars(text) {
  return {
    type: types.REQUEST_BARS,
    location: text,
    categories: category_bars
  };
}

export function requestBarsSuccess(bars) {
  return {
    type: types.REQUEST_BARS_SUCCESS,
    bars: bars
  };
}

export function requestBarsFailure(data) {
  return {
    type: types.REQUEST_BARS_FAILURE,
    location: data.text,
    error: data.error
  };
}

export function updateGoing(id) {
  return { type: types.UPDATE_GOING, id };
}

export function incrementGoing(id) {
  return { type: types.INCREMENT_GOING, id };
}

export function decrementGoing(id) {
  return { type: types.DECREMENT_GOING, id };
}

export function updateGoingFailure(data) {
  return {
    type: types.UPDATE_GOING_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function going(id) {
  return dispatch => {
    dispatch(updateGoing(id));
    
    return makeGoingRequest(id)
      .then(res => {
        if (res.data === 'added')
        {
          dispatch(incrementGoing(id));
        } else {
          dispatch(decrementGoing(id));
        }
      })
      .catch(() => dispatch(updateGoingFailure({id, error: 'Oops! Something went wrong trying to add you to the bar'})));
  };
}

function createBar(business) {
  return {
    id: business.id,
    name: business.name,
    imageUrl: business.image_url,
    going: 0
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function getBars(text) {
  return dispatch => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const params = {
      categories: category_bars,
      location: text,
      limit:10
    };

    // First dispatch the action to tell we requested bars
    dispatch(requestBars(text));

    return yelpApiCaller.search(params)
      .then(res => {
        if (res.status === 200) {
          
        /* {
          "total": 8228,
          "businesses": [
              {
              "rating": 4,
              "price": "$",
              "phone": "+14152520800",
              "id": "four-barrel-coffee-san-francisco",
              "is_closed": false,
              "categories": [
                {
                  "alias": "coffee",
                  "title": "Coffee & Tea"
                }
              ],
              "review_count": 1738,
              "name": "Four Barrel Coffee",
              "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
              "coordinates": {
                "latitude": 37.7670169511878,
                "longitude": -122.42184275
              },
              "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
              "location": {
                "city": "San Francisco",
                "country": "US",
                "address2": "",
                "address3": "",
                "state": "CA",
                  "address1": "375 Valencia St",
                  "zip_code": "94103"
                },
                "distance": 1604.23
              },
              // ...
            ],
            "region": {
              "center": {
                "latitude": 37.767413217936834,
                "longitude": -122.42820739746094
              }
            }
          }*/
          var bars = res.data.businesses.map(business => createBar(business));
          var barIds = bars.map(b => b.id).join();
          
          return makeGoingRequest(null, '/going', {
            ids: barIds
          })
            .then(res => {
              bars = bars.forEach(b => res.data.bars[b.id] ? b.going = res.data.bars[b.id] : 0);
              return dispatch(requestBarsSuccess(res.bars));
            })
            .catch(() => {
              return dispatch(requestBarsFailure({
                text,
                error: 'Oops! Something went wrong trying to update number of people going to bars'
              }));
            });
        }
      })
      .catch(() => {
        return dispatch(requestBarsFailure({ text, error: 'Oops! Something went wrong searching for bars'}));
      });
  };
}