import { combineReducers } from 'redux';
import * as types from '../types';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_USER:
    case types.SIGNUP_SUCCESS_USER:  
    case types.LOGOUT_USER:
    case types.SEND_MESSAGE:
    case types.SEND_MESSAGE_SUCCESS:
    case types.UPDATE_PERSONAL_DATA:
    case types.UPDATE_PERSONAL_DATA_SUCCESS:  
    case types.UPDATE_CONTACT_DETAILS:
    case types.UPDATE_CONTACT_DETAILS_SUCCESS:
    case types.UPDATE_EMAIL:
    case types.UPDATE_EMAIL_SUCCESS:
    case types.UPDATE_PASSWORD:
    case types.UPDATE_PASSWORD_SUCCESS:
    case types.INIT_RESET_PASSWORD:
    case types.COMPLETE_RESET_PASSWORD:
    case types.INIT_RESET_PASSWORD_SUCCESS:
    case types.COMPLETE_RESET_PASSWORD_SUCCESS:
    case types.CREATE_REQUEST:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.SEND_MESSAGE_ERROR:
    case types.INIT_RESET_PASSWORD_ERROR:
    case types.COMPLETE_RESET_PASSWORD_ERROR:
    case types.UPDATE_PERSONAL_DATA_ERROR:
    case types.UPDATE_CONTACT_DETAILS_ERROR:
    case types.UPDATE_EMAIL_ERROR:
    case types.UPDATE_PASSWORD_ERROR:
      return action.message;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
    case types.CONFIRM_SUCCESS_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.CONFIRM_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const loaded = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
    case types.LOGIN_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOAD_USER_ERROR:
    case types.LOGIN_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const email = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
    case types.LOGIN_SUCCESS_USER:  
      if (action.user) return action.user.email;
      return state;
    case types.UPDATE_EMAIL_SUCCESS:
      return action.email;
    case types.LOGOUT_SUCCESS_USER:
      return '';
    default:
      return state;
  }
};

const profile = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
    case types.LOGIN_SUCCESS_USER:  
      if (action.user) return action.user.profile;
      return state;
    case types.UPDATE_PERSONAL_DATA_SUCCESS:  
    case types.UPDATE_CONTACT_DETAILS_SUCCESS:
      return action.profile;
    case types.LOGOUT_SUCCESS_USER:
      return {};
    default:
      return state;
  }
};

const isAdmin = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
    case types.LOGIN_SUCCESS_USER:
      if (action.user) return action.user.admin;
      return state;
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const isMember = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
    case types.LOGIN_SUCCESS_USER:
      if (action.user) return action.user.member;
      return state;
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const toy = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.TOY_SAVE_SUCCESS:
      if (state._id === action.toy._id) {
        return action.toy;
      }
      return state;
    default:
      return state;
  }
};

const toys = (
  state = [],
  action
) => {
  switch (action.type) {
   case types.LOAD_USER_SUCCESS:
    case types.LOGIN_SUCCESS_USER:
      if (action.user && action.user.toys) return action.user.toys;
      return state;
    case types.TOY_SAVE_SUCCESS:
      return state.map(t => toy(t, action));
    case types.LOGOUT_SUCCESS_USER:
      return [];
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isLogin,
  authenticated,
  loaded,
  email,
  isAdmin,
  isMember,
  profile,
  toys,
  message
});

export default userReducer;
