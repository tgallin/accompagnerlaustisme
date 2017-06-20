import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../types';

polyfill();

const getMessage = res => res.response && res.response.data && res.response.data.message;

function makeRequest(method, data, api, config = {}) {
  return request[method](api, data, config);
}

export function beginSaveCat() {
  return { type: types.ADMIN_TOY_CAT_SAVE };
}

export function saveCatSuccess(data, action) {
  return {
    type: action,
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

export function saveTagSuccess(data, action) {
  return {
    type: action,
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

export function beginSaveToy() {
  return { type: types.TOY_SAVE };
}

export function saveToySuccess(data, action) {
  return {
    type: action,
    message: data.message,
    toy: data.toy
  };
}

export function saveToyError(message) {
  return {
    type: types.TOY_SAVE_ERROR,
    message
  };
}

export function beginDeleteToy() {
  return { type: types.TOY_DELETE };
}

export function deleteToySuccess(data) {
  return {
    type: types.TOY_DELETE_SUCCESS,
    message: data.message,
    id: data.id
  };
}

export function deleteToyError(message) {
  return {
    type: types.TOY_DELETE_ERROR,
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
          var action = data.toyCatId === 0 ? types.ADMIN_TOY_CAT_CREATE_SUCCESS : types.ADMIN_TOY_CAT_UPDATE_SUCCESS;
          dispatch(saveCatSuccess(response.data, action));
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
          var action = data.toyTagId === 0 ? types.ADMIN_TOY_TAG_CREATE_SUCCESS : types.ADMIN_TOY_TAG_UPDATE_SUCCESS;
          dispatch(saveTagSuccess(response.data, action));
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

export function saveToy(data, toyId) {
  return (dispatch) => {

    dispatch(beginSaveToy());

    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    };

    return makeRequest('post', data, '/toys', config)
      .then(response => {
        if (response.status === 200) {
          // can't use data.get('toyId') because it doesn't work in IE, tha's why I had to pass in toyId as parameter 
          var action = toyId === '0' ? types.TOY_CREATE_SUCCESS : types.TOY_UPDATE_SUCCESS;
          dispatch(push('/dashboard/mytoys'));
          dispatch(saveToySuccess(response.data, action));
        } else {
          dispatch(saveToyError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveToyError(getMessage(err)));
      });
  };
}

export function deleteToy(id) {
  return (dispatch) => {
    
    dispatch(beginDeleteToy());

    return makeRequest('delete', {}, '/toys/' + id)
      .then(response => {
        if (response.status === 200) {
          dispatch(deleteToySuccess(response.data));
        } else {
          dispatch(deleteToyError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(deleteToyError(getMessage(err)));
      });
  };
}

export function changeApprobationToy(data) {
  return (dispatch) => {
    
    dispatch(beginSaveToy());

    return makeRequest('post', data, '/toys/changeApprobation')
      .then(response => {
        if (response.status === 200) {
          dispatch(push('/dashboard/toyLibrary/toys'));
          dispatch(saveToySuccess(response.data, types.TOY_UPDATE_SUCCESS));
        } else {
          dispatch(saveToyError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveToyError(getMessage(err)));
      });
  }
}