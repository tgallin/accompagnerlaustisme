import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeUserRequest(method, data, api = '/login') {
  return request[method](api, data);
}

// Load user profile Action Creators
export function beginLoadUser() {
  return { type: types.LOAD_USER };
}

export function loadUserSuccess(data) {
  return {
    type: types.LOAD_USER_SUCCESS,
    user: data.user
  };
}

export function loadUserError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

// Log In Action Creators
export function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message: data.message,
    user: data.user
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

export function beginUpdatePersonalData() {
  return { type: types.UPDATE_PERSONAL_DATA};
}

export function updatePersonalDataSuccess(data) {
  return { 
    type: types.UPDATE_PERSONAL_DATA_SUCCESS,
    message: data.message,
    profile: data.profile
  };
}

export function updatePersonalDataError(message) {
  return { type: types.UPDATE_PERSONAL_DATA_ERROR,
    message };
}

export function beginUpdateContactDetails() {
  return { type: types.UPDATE_CONTACT_DETAILS};
}

export function updateContactDetailsSuccess(data) {
  return { 
    type: types.UPDATE_CONTACT_DETAILS_SUCCESS,
    message: data.message,
    profile: data.profile
  };
}

export function updateContactDetailsError(message) {
  return { type: types.UPDATE_CONTACT_DETAILS_ERROR,
    message };
}

export function beginUpdateEmail() {
  return { type: types.UPDATE_EMAIL};
}

export function updateEmailSuccess(data) {
  return { 
    type: types.UPDATE_EMAIL_SUCCESS,
    message: data.message,
    email: data.email
  };
}

export function updateEmailError(message) {
  return { type: types.UPDATE_EMAIL_ERROR,
    message };
}

export function beginUpdatePassword() {
  return { type: types.UPDATE_PASSWORD};
}

export function updatePasswordSuccess(message) {
  return { 
    type: types.UPDATE_PASSWORD_SUCCESS,
    message
  };
}

export function updatePasswordError(message) {
  return { type: types.UPDATE_PASSWORD_ERROR,
    message };
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data));
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

export function updatePersonalData(data) {
  return dispatch => {
    dispatch(beginUpdatePersonalData());

    return makeUserRequest('post', data, '/updatePersonalData')
      .then(response => {
        if (response.status === 200) {
          dispatch(updatePersonalDataSuccess(response.data));
        } else {
          dispatch(updatePersonalDataError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(updatePersonalDataError(getMessage(err)));
      });
  };
}

export function updateContactDetails(data) {
  return dispatch => {
    dispatch(beginUpdateContactDetails());

    return makeUserRequest('post', data, '/updateContactDetails')
      .then(response => {
        if (response.status === 200) {
          dispatch(updateContactDetailsSuccess(response.data));
        } else {
          dispatch(updateContactDetailsError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(updateContactDetailsError(getMessage(err)));
      });
  };
}

export function updateEmail(data) {
  return dispatch => {
    dispatch(beginUpdateEmail());

    return makeUserRequest('post', data, '/updateEmail')
      .then(response => {
        if (response.status === 200) {
          dispatch(updateEmailSuccess(response.data));
        } else {
          dispatch(updateEmailError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(updateEmailError(getMessage(err)));
      });
  };
}

export function updatePassword(data) {
  return dispatch => {
    dispatch(beginUpdatePassword());

    return makeUserRequest('post', data, '/updatePassword')
      .then(response => {
        if (response.status === 200) {
          dispatch(updatePasswordSuccess(response.data.message));
        } else {
          dispatch(updatePasswordError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(updatePasswordError(getMessage(err)));
      });
  };
}