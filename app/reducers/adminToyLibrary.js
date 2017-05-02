import { combineReducers } from 'redux';
import * as types from '../types';

const toy = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.ADMIN_TOY_SAVE_SUCCESS:
      if (state._id === action.toy._id) {
        return action.toy;
      }
      return state;
    default:
      return state;
  }
};

const toys = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.toys) return action.data.toys;
      return state;
    case types.ADMIN_TOY_SAVE_SUCCESS:
      return state.map(t => toy(t, action));
    default:
      return state;
  }
};

const category = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.ADMIN_TOY_CAT_SAVE_SUCCESS:
      if (state._id === action.category._id) {
        return action.category;
      }
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
    case types.ADMIN_TOY_CAT_SAVE_SUCCESS:
      return state.map(t => category(t, action));
    case types.ADMIN_TOY_CAT_DELETE_SUCCESS:
      return state.filter(c => c._id !== action.id);
    default:
      return state;
  }
};

const tag = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.ADMIN_TOY_TAG_SAVE_SUCCESS:
      if (state._id === action.tag._id) {
        return action.tag;
      }
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
    case types.ADMIN_TOY_TAG_SAVE_SUCCESS:
      return state.map(t => tag(t, action));
    case types.ADMIN_TOY_TAG_DELETE_SUCCESS:
      return state.filter(t => t._id !== action.id);  
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.ADMIN_TOY_SAVE_SUCCESS:
    case types.ADMIN_TOY_CAT_SAVE_SUCCESS:
    case types.ADMIN_TOY_TAG_SAVE_SUCCESS:
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

const toysPage = (
  state = 1,
  action
) => {
  switch (action.type) {
    case types.PREVIOUS_PAGE:
      return state - 1;
    case types.NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
};

const categoriesPage = (
  state = 1,
  action
) => {
  switch (action.type) {
    case types.PREVIOUS_PAGE:
      return state - 1;
    case types.NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
};

const tagsPage = (
  state = 1,
  action
) => {
  switch (action.type) {
    case types.PREVIOUS_PAGE:
      return state - 1;
    case types.NEXT_PAGE:
      return state + 1;
    default:
      return state;
  }
};

const adminToyLibraryReducer = combineReducers({
  toys,
  categories,
  tags,
  message,
  toysPage,
  categoriesPage,
  tagsPage
});

export default adminToyLibraryReducer;
