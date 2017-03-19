import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeUserRequest(method, data, api = '/login') {
  return request[method](api, data);
}

export function beginSave() {
  return { type: types.ADMIN_USER_SAVE };
}

export function saveSuccess(data) {
  return {
    type: types.ADMIN_USER_SAVE_SUCCESS,
    message: data.message,
    user: data.user
  };
}

export function saveError(message) {
  return {
    type: types.ADMIN_USER_SAVE_ERROR,
    message
  };
}

export function saveUser(data) {
  return dispatch => {
    dispatch(beginSave());

    return makeUserRequest('post', data, '/admin/saveUser')
      .then(response => {
        if (response.status === 200) {
          dispatch(saveSuccess(response.data));
        } else {
          dispatch(saveError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveError(getMessage(err)));
      });
  };
}
