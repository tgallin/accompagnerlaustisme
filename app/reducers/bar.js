import { combineReducers } from 'redux';
import * as types from '../types';

const bar = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.INCREMENT_GOING:
      if (state.id === action.id) {
        return { ...state, going: state.going + 1 };
      }
      return state;
    case types.DECREMENT_GOING:
      if (state.id === action.id) {
        return { ...state, going: state.going - 1 };
      }
      return state;
    default:
      return state;
  }
};

const bars = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_BARS:
      return [];
    case types.REQUEST_BARS_SUCCESS:
      return [...state, action.bars];
    case types.INCREMENT_GOING:
    case types.DECREMENT_GOING:
      return state.map(b => bar(b, action));
    default:
      return state;
  }
};

const newLocation = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPING_LOCATION:
      return action.newLocation;
    default:
      return state;
  }
};

const barReducer = combineReducers({
  bars,
  newLocation
});

export default barReducer;
