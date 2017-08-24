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

export function saveSuccess(data, action) {
  return {
    type: action,
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

export function beginDeleteUser() {
  return { 
    type: types.ADMIN_USER_DELETE 
  };
}

export function deleteUserSuccess(data) {
  return {
    type: types.ADMIN_USER_DELETE_SUCCESS,
    message: data.message,
    id: data.id
  };
}

export function deleteUserError(message) {
  return {
    type: types.ADMIN_USER_DELETE_ERROR,
    message
  };
}

export function saveUser(data) {
  return dispatch => {
    dispatch(beginSave());

    return makeUserRequest('post', data, '/admin/saveUser')
      .then(response => {
        if (response.status === 200) {
          var action = data.userId === 0 ? types.ADMIN_USER_CREATE_SUCCESS : types.ADMIN_USER_UPDATE_SUCCESS;
          dispatch(saveSuccess(response.data, action));
        } else {
          dispatch(saveError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveError(getMessage(err)));
      });
  };
}


export function deleteUser(id) {    
  return dispatch => {
    dispatch(beginDeleteUser());

    return makeUserRequest('delete',{},'/users/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(deleteUserSuccess(response.data));
        } else {
          dispatch(deleteUserError('Mince ! Quelque chose s\'est mal passé'));
        }
      })
      .catch(err => {
        dispatch(deleteUserError(getMessage(err)));
      });
  };
}

