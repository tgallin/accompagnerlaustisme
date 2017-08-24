import { combineReducers } from 'redux';
import * as types from '../types';

const user = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.ADMIN_USER_UPDATE_SUCCESS:
      if (state._id === action.user._id) {
        return action.user;
      }
      return state;
    default:
      return state;
  }
};

const users = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.users) return action.data.users;
      return state;
    case types.ADMIN_USER_CREATE_SUCCESS:  
      return [...state, action.user];
    case types.ADMIN_USER_UPDATE_SUCCESS:
      return state.map(u => user(u, action));
    case types.ADMIN_USER_DELETE_SUCCESS:
      return state.filter(u => u._id !== action.id);
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.ADMIN_USER_CREATE_SUCCESS:
    case types.ADMIN_USER_UPDATE_SUCCESS:
    case types.ADMIN_USER_DELETE_SUCCESS:
    case types.CREATE_REQUEST:
      return '';
    case types.ADMIN_USER_SAVE_ERROR:
    case types.ADMIN_USER_DELETE_ERROR:
      return action.message;
    default:
      return state;
  }
};

const page = (
  state = 1,
  action
) => {
  switch (action.type) {
    case types.PREVIOUS_PAGE:
      return state - 1;
    case types.NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
};

const adminUsersReducer = combineReducers({
  users,
  message,
  page
});

export default adminUsersReducer;
