import { polyfill } from 'es6-promise';
import request from 'axios';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeRequest(method, data, api) {
  return request[method](api, data);
}

export function beginSaveCat() {
  return { type: types.ADMIN_TOY_CAT_SAVE };
}

export function saveCatSuccess(data) {
  return {
    type: types.ADMIN_TOY_CAT_SAVE_SUCCESS,
    message: data.message,
    category: data.category
  };
}

export function createCatDuplicate(message) {
  return {
    type: types.ADMIN_TOY_CAT_DUPLICATE,
    message
  };
}

export function saveCatError(message) {
  return {
    type: types.ADMIN_TOY_CAT_SAVE_ERROR,
    message
  };
}

export function beginSaveTag() {
  return { type: types.ADMIN_TOY_TAG_SAVE };
}

export function saveTagSuccess(data) {
  return {
    type: types.ADMIN_TOY_TAG_SAVE_SUCCESS,
    message: data.message,
    tag: data.tag
  };
}

export function createTagDuplicate(message) {
  return {
    type: types.ADMIN_TOY_TAG_DUPLICATE,
    message
  };
}

export function saveTagError(message) {
  return {
    type: types.ADMIN_TOY_TAG_SAVE_ERROR,
    message
  };
}

export function beginDeleteCat() {
  return { type: types.ADMIN_TOY_CAT_DELETE };
}

export function deleteCatSuccess(data) {
  return {
    type: types.ADMIN_TOY_CAT_DELETE_SUCCESS,
    message: data.message,
    id: data.id
  };
}

export function deleteCatError(message) {
  return {
    type: types.ADMIN_TOY_CAT_DELETE_ERROR,
    message
  };
}

export function beginDeleteTag() {
  return { type: types.ADMIN_TOY_TAG_DELETE };
}

export function deleteTagSuccess(data) {
  return {
    type: types.ADMIN_TOY_TAG_DELETE_SUCCESS,
    message: data.message,
    id: data.id
  };
}

export function deleteTagError(message) {
  return {
    type: types.ADMIN_TOY_TAG_DELETE_ERROR,
    message
  };
}

export function saveToyCategory(data) {
  return (dispatch, getState) => {

    const { adminToyLibrary } = getState();

    // Conditional dispatch
    // If the category already exists, make sure we emit a dispatch event
    if (adminToyLibrary.categories.filter(cat => cat._id !== data.toyCatId && cat.name.toLowerCase() === data.name.toLowerCase()).length > 0) {
      return dispatch(createCatDuplicate('Cette catégorie existe déjà'));
    }
    
    dispatch(beginSaveCat());

    return makeRequest('post', data, '/toys/category')
      .then(response => {
        if (response.status === 200) {
          dispatch(saveCatSuccess(response.data));
        } else {
          dispatch(saveCatError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveCatError(getMessage(err)));
      });
  };
}


export function saveToyTag(data) {
  return (dispatch, getState) => {
    
    // update
    const { adminToyLibrary } = getState();
  
    // Conditional dispatch
    // If the tag already exists, make sure we emit a dispatch event
    if (adminToyLibrary.tags.filter(tag => tag._id !== data.toyTagId && tag.name.toLowerCase() === data.name.toLowerCase()).length > 0) {
      return dispatch(createTagDuplicate('Ce mot clé existe déjà'));
    }
    
    dispatch(beginSaveTag());

    return makeRequest('post', data, '/toys/tag')
      .then(response => {
        if (response.status === 200) {
          dispatch(saveTagSuccess(response.data));
        } else {
          dispatch(saveTagError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveTagError(getMessage(err)));
      });
  };
}

export function deleteToyCategory(id) {
  return (dispatch) => {
    
    dispatch(beginDeleteCat());

    return makeRequest('delete', {}, '/toys/category/' + id )
      .then(response => {
        if (response.status === 200) {
          dispatch(deleteCatSuccess(response.data));
        } else {
          dispatch(deleteCatError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(deleteCatError(getMessage(err)));
      });
  };
}

export function deleteToyTag(id) {
  return (dispatch) => {
    
    dispatch(beginDeleteTag());

    return makeRequest('delete', {}, '/toys/tag/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(deleteTagSuccess(response.data));
        } else {
          dispatch(deleteTagError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(deleteTagError(getMessage(err)));
      });
  };
}