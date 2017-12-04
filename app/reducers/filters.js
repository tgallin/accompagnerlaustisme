import { combineReducers } from 'redux';
import * as types from '../types';

const expanded = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.EXPAND_FILTER:
      return true;
    case types.COLLAPSE_FILTER:
      return false;
    default:
      return state;
  }
};

const categories = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.ADD_CAT_IN_FILTER:  
      return [...state, action.id];
    case types.REMOVE_CAT_FROM_FILTER:
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
};

const tags = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.ADD_TAG_IN_FILTER:  
      return [...state, action.id];
    case types.REMOVE_TAG_FROM_FILTER:
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
};

const filtersReducer = combineReducers({
  expanded,
  categories,
  tags
});

export default filtersReducer;
