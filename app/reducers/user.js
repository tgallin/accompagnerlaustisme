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
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.SEND_MESSAGE:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.SEND_MESSAGE_SUCCESS:
    case types.INIT_RESET_PASSWORD:
    case types.COMPLETE_RESET_PASSWORD:
    case types.INIT_RESET_PASSWORD_SUCCESS:
    case types.COMPLETE_RESET_PASSWORD_SUCCESS:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.SEND_MESSAGE_ERROR:
    case types.INIT_RESET_PASSWORD_ERROR:
    case types.COMPLETE_RESET_PASSWORD_ERROR:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.SEND_MESSAGE:
    case types.INIT_RESET_PASSWORD:
    case types.COMPLETE_RESET_PASSWORD:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.SEND_MESSAGE_SUCCESS:
    case types.INIT_RESET_PASSWORD_SUCCESS:
    case types.COMPLETE_RESET_PASSWORD_SUCCESS:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
    case types.SEND_MESSAGE_ERROR:
    case types.INIT_RESET_PASSWORD_ERROR:
    case types.COMPLETE_RESET_PASSWORD_ERROR:
      return false;
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

const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  message
});

export default userReducer;
