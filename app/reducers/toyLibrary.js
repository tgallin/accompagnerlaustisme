import { combineReducers } from 'redux';
import * as types from '../types';
import filters from '../reducers/filters';
import search from '../reducers/toySearch';

const toys = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.onlinetoys) return action.data.onlinetoys;
      return state;
    default:
      return state;
  }
};

const categories = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.categories) return action.data.categories;
      return state;
    default:
      return state;
  }
};

const tags = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.tags) return action.data.tags;
      return state;
    default:
      return state;
  }
};

const toyLibraries = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.toyLibraries) return action.data.toyLibraries;
      return state;
    default:
      return state;
  }
};

const toyLibraryReducer = combineReducers({
  toys,
  categories,
  tags,
  toyLibraries,
  filters,
  search
});

export default toyLibraryReducer;
