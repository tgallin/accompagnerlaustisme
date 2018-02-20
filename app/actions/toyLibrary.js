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

export function beginSaveToyLibrary() {
  return { type: types.ADMIN_TOY_LIB_SAVE };
}

export function saveToyLibrarySuccess(data, action) {
  return {
    type: action,
    message: data.message,
    toyLibrary: data.toyLibrary
  };
}

export function saveToyLibraryError(message) {
  return {
    type: types.ADMIN_TOY_LIB_SAVE_ERROR,
    message
  };
}

export function beginSaveToyBooking() {
  return { type: types.ADMIN_TOY_BOOKING_SAVE };
}

export function saveToyBookingSuccess(data, action) {
  return {
    type: action,
    message: data.message,
    toyBooking: data.toyBooking
  };
}

export function saveToyBookingError(message) {
  return {
    type: types.ADMIN_TOY_BOOKING_SAVE_ERROR,
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

export function beginDeleteToyLibrary() {
  return { type: types.ADMIN_TOY_LIB_DELETE };
}

export function deleteToyLibrarySuccess(data) {
  return {
    type: types.ADMIN_TOY_LIB_DELETE_SUCCESS,
    message: data.message,
    id: data.id
  };
}

export function deleteToyLibraryError(message) {
  return {
    type: types.ADMIN_TOY_LIB_DELETE_ERROR,
    message
  };
}

export function beginDeleteToyBooking() {
  return { type: types.ADMIN_TOY_BOOKING_DELETE };
}

export function deleteToyBookingSuccess(data) {
  return {
    type: types.ADMIN_TOY_BOOKING_DELETE_SUCCESS,
    message: data.message,
    id: data.id
  };
}

export function deleteToyBookingError(message) {
  return {
    type: types.ADMIN_TOY_BOOKING_DELETE_ERROR,
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

export function addCatInFilter(data) {
  return {
    type: types.ADD_CAT_IN_FILTER,
    id: data.catId
  };
}

export function removeCatFromFilter(data) {
  return {
    type: types.REMOVE_CAT_FROM_FILTER,
    id: data.catId
  };
}

export function addTagInFilter(data) {
  return {
    type: types.ADD_TAG_IN_FILTER,
    id: data.tagId
  };
}

export function removeTagFromFilter(data) {
  return {
    type: types.REMOVE_TAG_FROM_FILTER,
    id: data.tagId
  };
}

export function expandFilter() {
  return {
    type: types.EXPAND_FILTER,
  };
}

export function collapseFilter() {
  return {
    type: types.COLLAPSE_FILTER,
  };
}

export function beginSearchToys(text) {
  return { 
    type: types.TOY_SEARCH,
    text: text
  };
}

export function searchToysSuccess(data) {
  return {
    type: types.TOY_SEARCH_SUCCESS,
    text: data.text,
    results: data.results
  };
}

export function searchToysError(message) {
  return {
    type: types.TOY_SEARCH_ERROR,
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
          dispatch(push('/dashboard/toyLibrary/categories'));
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
          dispatch(push('/dashboard/toyLibrary/tags'));
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

export function saveToyLibrary(data) {
  return (dispatch, getState) => {

    dispatch(beginSaveToyLibrary());

    return makeRequest('post', data, '/toys/toylibrary')
      .then(response => {
        if (response.status === 200) {
          var action = data.toyLibraryId === 0 ? types.ADMIN_TOY_LIB_CREATE_SUCCESS : types.ADMIN_TOY_LIB_UPDATE_SUCCESS;
          dispatch(push('/dashboard/toyLibrary/locations'));
          dispatch(saveToyLibrarySuccess(response.data, action));
        } else {
          dispatch(saveToyLibraryError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveToyLibraryError(getMessage(err)));
      });
  };
}

export function saveToyBooking(data) {
  return (dispatch, getState) => {

    dispatch(beginSaveToyBooking());

    return makeRequest('post', data, '/toys/booking')
      .then(response => {
        if (response.status === 200) {
          var action = data.toyBookingId === 0 ? types.ADMIN_TOY_BOOKING_CREATE_SUCCESS : types.ADMIN_TOY_BOOKING_UPDATE_SUCCESS;
          dispatch(push('/dashboard/toyLibrary/bookings'));
          dispatch(saveToyBookingSuccess(response.data, action));
        } else {
          dispatch(saveToyBookingError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveToyBookingError(getMessage(err)));
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

export function deleteToyLibrary(id) {
  return (dispatch) => {
    
    dispatch(beginDeleteToyLibrary());

    return makeRequest('delete', {}, '/toys/toylibrary/' + id )
      .then(response => {
        if (response.status === 200) {
          dispatch(deleteToyLibrarySuccess(response.data));
        } else {
          dispatch(deleteToyLibraryError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(deleteToyLibraryError(getMessage(err)));
      });
  };
}

export function deleteToyBooking(id) {
  return (dispatch) => {
    
    dispatch(beginDeleteToyBooking());

    return makeRequest('delete', {}, '/toys/booking/' + id )
      .then(response => {
        if (response.status === 200) {
          dispatch(deleteToyBookingSuccess(response.data));
        } else {
          dispatch(deleteToyBookingError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(deleteToyBookingError(getMessage(err)));
      });
  };
}

export function saveToy(data, toyId, returnUrl) {
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
          dispatch(push(returnUrl));
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

export function searchToys(data) {
  return (dispatch) => {
    
    dispatch(beginSearchToys(data.text));

    return makeRequest('post', data, '/toys/search')
      .then(response => {
        if (response.status === 200) {
          dispatch(searchToysSuccess(response.data));
          dispatch(push('/ludotheque/search'));
        } else {
          dispatch(searchToysError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(searchToysError(getMessage(err)));
      });
  };
}

export function toggleOnlineToy(data) {
  return (dispatch) => {
    
    dispatch(beginSaveToy());

    return makeRequest('post', data, '/toys/toggleOnline')
      .then(response => {
        if (response.status === 200) {
          dispatch(saveToySuccess(response.data, types.TOY_UPDATE_SUCCESS));
        } else {
          dispatch(saveToyError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(saveToyError(getMessage(err)));
      });
  };
}

export function toggleCatFilter(data) {
  return (dispatch, getState) => {

    const { toyLibrary } = getState();

    var includedInFilter = toyLibrary.filters && toyLibrary.filters.categories && toyLibrary.filters.categories.includes(data.catId);
    
    includedInFilter ? dispatch(removeCatFromFilter(data)) : dispatch(addCatInFilter(data));
  };
}

export function toggleTagFilter(data) {
  return (dispatch, getState) => {

    const { toyLibrary } = getState();

    var includedInFilter = toyLibrary.filters && toyLibrary.filters.tags && toyLibrary.filters.tags.includes(data.tagId);
    
    includedInFilter ? dispatch(removeTagFromFilter(data)) : dispatch(addTagInFilter(data));
  };
}

export function toggleFilterPanel() {
  return (dispatch, getState) => {

    const { toyLibrary } = getState();

    toyLibrary.filters.expanded ? dispatch(collapseFilter()) : dispatch(expandFilter());
  };
}

