/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import axios from 'axios';
import * as types from '../types';
import { foursquareService, localStorageService } from '../services';
import { push } from 'react-router-redux';

const category_bars = 'bars';

polyfill();

export function makeGoingRequest(id, data) {
  return axios.get('/going' + (id ? ('/' + id) : ''), {
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
  return (dispatch, getState) => {

    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { user, bar } = getState();

    // Conditional dispatch
    // If the user isn't authenticated they must login first
    if (!user.authenticated) {
      localStorageService.persist(bar.newLocation);
      dispatch(push('/login'));
    }
    else {
      dispatch(updateGoing(id));

      return makeGoingRequest(id)
        .then(res => {
          if (res.data === 'added') {
            dispatch(incrementGoing(id));
          }
          else {
            dispatch(decrementGoing(id));
          }
        })
        .catch(() => dispatch(updateGoingFailure({
          id,
          error: 'Oops! Something went wrong trying to add you to the bar'
        })));
    }
  };
}

function createBar(venue) {
  return {
    id: venue.id,
    name: venue.name,
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

    // First dispatch the action to tell we requested bars
    dispatch(requestBars(text));

    return foursquareService.searchVenues(text)
      .then(res => {
        if (res.status === 200) {
          
          var bars = res.data.response.venues.map(venue => createBar(venue));
          var barIds = bars.map(b => b.id).join();
          
          return makeGoingRequest(undefined, {
            ids: barIds
          })
            .then(res => {
              if (res.status === 200) {
                //res.data something like [{_id : "123456789", going: 1}, ...]
                
                var goingsByBar = {};
                res.data.forEach(function (g) {
                  goingsByBar[g._id] = g.going;
                });
                bars.forEach(b => goingsByBar[b.id] ? b.going = goingsByBar[b.id] : 0);
                return dispatch(requestBarsSuccess(bars));
              }
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