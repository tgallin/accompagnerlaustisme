import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeUserRequest(method, data, api = '/login') {
  return request[method](api, data);
}

// Log In Action Creators
export function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

export function loginSuccess(message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message
  };
}

export function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

// Sign Up Action Creators
export function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

export function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

export function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

// Log Out Action Creators
export function beginLogout() {
  return { type: types.LOGOUT_USER};
}

export function logoutSuccess(message) {
  return { 
    type: types.LOGOUT_SUCCESS_USER,
    message
  };
}

export function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}


export function beginInitResetPassword() {
  return { type: types.INIT_RESET_PASSWORD };
}

export function initResetPasswordSuccess(message) {
  return {
    type: types.INIT_RESET_PASSWORD_SUCCESS,
    message
  };
}

export function initResetPasswordError(message) {
  return {
    type: types.INIT_RESET_PASSWORD_ERROR,
    message
  };
}

export function beginCompleteResetPassword() {
  return { type: types.COMPLETE_RESET_PASSWORD };
}

export function completeResetPasswordSuccess(message) {
  return {
    type: types.COMPLETE_RESET_PASSWORD_SUCCESS,
    message
  };
}

export function completeResetPasswordError(message) {
  return {
    type: types.COMPLETE_RESET_PASSWORD_ERROR,
    message
  };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(push('/dashboard'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(getMessage(err)));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/confirmation'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(getMessage(err)));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess('Vous êtes maintenant déconnecté.'));
        } else {
          dispatch(logoutError());
        }
      });
  };
}


export function initResetPassword(data) {
  return dispatch => {
    dispatch(beginInitResetPassword());

    return makeUserRequest('post', data, '/initResetPassword')
      .then(response => {
        if (response.status === 200) {
          dispatch(initResetPasswordSuccess(response.data.message));
        } else {
          dispatch(initResetPasswordError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(initResetPasswordError(getMessage(err)));
      });
  };
}

export function completeResetPassword(token, data) {
  return dispatch => {
    dispatch(beginCompleteResetPassword());

    console.log(token);

    return makeUserRequest('post', data, '/completeResetPassword/' + token)
      .then(response => {
        if (response.status === 200) {
          dispatch(completeResetPasswordSuccess(response.data.message));
          dispatch(push('/dashboard'));
        } else {
          dispatch(completeResetPasswordError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(completeResetPasswordError(getMessage(err)));
      });
  };
}