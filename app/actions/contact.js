import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeSendMessageRequest(method, data, api = '/message') {
  return request[method](api, data);
}

// Action Creators
export function beginSend() {
  return { type: types.SEND_MESSAGE };
}

export function sendSuccess(message) {
  return {
    type: types.SEND_MESSAGE_SUCCESS,
    message
  };
}

export function sendError(message) {
  return {
    type: types.SEND_MESSAGE_ERROR,
    message
  };
}

export function sendMessage(data) {
  return dispatch => {
    dispatch(beginSend());

    return makeSendMessageRequest('post', data, '/message')
      .then(response => {
        if (response.status === 200) {
          dispatch(sendSuccess('Merci ! Votre message a bien été envoyé.'));
        } else {
          dispatch(sendError('Il y a eu un problème lors de l\'envoi de votre message.'));
        }
      })
      .catch(err => {
        dispatch(sendError(getMessage(err)));
      });
  };
}

