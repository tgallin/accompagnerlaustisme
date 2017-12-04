import { combineReducers } from 'redux';
import * as types from '../types';

const text = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOY_SEARCH:
    case types.TOY_SEARCH_SUCCESS:
      if (action.text) return action.text;
      return state;
    case types.TOY_SEARCH_ERROR:
      return state;
    default:
      return state;
  }
};

const results = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.TOY_SEARCH:
    case types.TOY_SEARCH_ERROR:
      return [];
    case types.TOY_SEARCH_SUCCESS:
      return action.results;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOY_SEARCH:
    case types.TOY_SEARCH_SUCCESS:
      return '';
    case types.TOY_SEARCH_ERROR:
      return action.message;
    default:
      return state;
  }
};

const toySearchReducer = combineReducers({
  text,
  results,
  message
});

export default toySearchReducer;
