import { combineReducers } from 'redux';
import * as types from '../types';

const toys = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.onlinetoys) return action.data.onlinetoys;
      return state;
    default:
      return state;
  }
};

const categories = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.categories) return action.data.categories;
      return state;
    default:
      return state;
  }
};

const tags = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.tags) return action.data.tags;
      return state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.ADMIN_TOY_CREATE_SUCCESS:
    case types.ADMIN_TOY_CAT_CREATE_SUCCESS:
    case types.ADMIN_TOY_TAG_CREATE_SUCCESS:
    case types.ADMIN_TOY_UPDATE_SUCCESS:
    case types.ADMIN_TOY_CAT_UPDATE_SUCCESS:
    case types.ADMIN_TOY_TAG_UPDATE_SUCCESS:  
    case types.ADMIN_TOY_CAT_DELETE_SUCCESS:
    case types.ADMIN_TOY_TAG_DELETE_SUCCESS:
    case types.CREATE_REQUEST:
      return '';
    case types.ADMIN_TOY_SAVE_ERROR:
    case types.ADMIN_TOY_CAT_SAVE_ERROR:
    case types.ADMIN_TOY_TAG_SAVE_ERROR:
    case types.ADMIN_TOY_CAT_DELETE_ERROR:
    case types.ADMIN_TOY_TAG_DELETE_ERROR:
    case types.ADMIN_TOY_CAT_DUPLICATE:
    case types.ADMIN_TOY_TAG_DUPLICATE:
      return action.message;
    default:
      return state;
  }
};


const toyLibraryReducer = combineReducers({
  toys,
  categories,
  tags,
  message
});

export default toyLibraryReducer;
