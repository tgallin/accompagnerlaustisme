import { combineReducers } from 'redux';
import * as types from '../types';

const toy = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.TOY_UPDATE_SUCCESS:
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
    case types.TOY_CREATE_SUCCESS:  
      return [...state, action.toy];
    case types.TOY_UPDATE_SUCCESS:
      return state.map(t => toy(t, action));
    case types.TOY_DELETE_SUCCESS:
      return state.filter(t => t._id !== action.id);
    case types.ADMIN_TOY_BOOKING_CREATE_SUCCESS:
    case types.ADMIN_TOY_BOOKING_UPDATE_SUCCESS:
    case types.ADMIN_TOY_BOOKING_DELETE_SUCCESS:
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
    case types.ADMIN_TOY_CAT_UPDATE_SUCCESS:
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
    case types.ADMIN_TOY_CAT_CREATE_SUCCESS:  
      return [...state, action.category];
    case types.ADMIN_TOY_CAT_UPDATE_SUCCESS:
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
    case types.ADMIN_TOY_TAG_UPDATE_SUCCESS:
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
    case types.ADMIN_TOY_TAG_CREATE_SUCCESS:  
      return [...state, action.tag];
    case types.ADMIN_TOY_TAG_UPDATE_SUCCESS:
      return state.map(t => tag(t, action));
    case types.ADMIN_TOY_TAG_DELETE_SUCCESS:
      return state.filter(t => t._id !== action.id);  
    default:
      return state;
  }
};

const toyLibrary = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.ADMIN_TOY_LIB_UPDATE_SUCCESS:
      if (state._id === action.toyLibrary._id) {
        return action.toyLibrary;
      }
      return state;
    default:
      return state;
  }
};

const toyLibraries = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.toyLibraries) return action.data.toyLibraries;
      return state;
    case types.ADMIN_TOY_LIB_CREATE_SUCCESS:  
      return [...state, action.toyLibrary];
    case types.ADMIN_TOY_LIB_UPDATE_SUCCESS:
      return state.map(t => toyLibrary(t, action));
    case types.ADMIN_TOY_LIB_DELETE_SUCCESS:
      return state.filter(t => t._id !== action.id);  
    default:
      return state;
  }
};

const toyBooking = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.ADMIN_TOY_BOOKING_UPDATE_SUCCESS:
      if (state._id === action.toyBooking._id) {
        return action.toyBooking;
      }
      return state;
    default:
      return state;
  }
};

const toyBookings = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data && action.data.toyBookings) return action.data.toyBookings;
      return state;
    case types.ADMIN_TOY_BOOKING_CREATE_SUCCESS:  
      return [...state, action.toyBooking];
    case types.ADMIN_TOY_BOOKING_UPDATE_SUCCESS:
      return state.map(t => toyBooking(t, action));
    case types.ADMIN_TOY_BOOKING_DELETE_SUCCESS:
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
    case types.TOY_CREATE_SUCCESS:
    case types.ADMIN_TOY_CAT_CREATE_SUCCESS:
    case types.ADMIN_TOY_TAG_CREATE_SUCCESS:
    case types.ADMIN_TOY_LIB_CREATE_SUCCESS:
    case types.ADMIN_TOY_BOOKING_CREATE_SUCCESS:
    case types.TOY_UPDATE_SUCCESS:
    case types.ADMIN_TOY_CAT_UPDATE_SUCCESS:
    case types.ADMIN_TOY_TAG_UPDATE_SUCCESS:  
    case types.ADMIN_TOY_LIB_UPDATE_SUCCESS:
    case types.ADMIN_TOY_BOOKING_UPDATE_SUCCESS:
    case types.TOY_DELETE_SUCCESS:
    case types.ADMIN_TOY_CAT_DELETE_SUCCESS:
    case types.ADMIN_TOY_TAG_DELETE_SUCCESS:
    case types.ADMIN_TOY_LIB_DELETE_SUCCESS:  
    case types.ADMIN_TOY_BOOKING_DELETE_SUCCESS: 
    case types.CREATE_REQUEST:
      return '';
    case types.TOY_SAVE_ERROR:
    case types.ADMIN_TOY_CAT_SAVE_ERROR:
    case types.ADMIN_TOY_TAG_SAVE_ERROR:
    case types.ADMIN_TOY_LIB_SAVE_ERROR:
    case types.ADMIN_TOY_BOOKING_SAVE_ERROR:
    case types.TOY_DELETE_ERROR:
    case types.ADMIN_TOY_CAT_DELETE_ERROR:
    case types.ADMIN_TOY_TAG_DELETE_ERROR:
    case types.ADMIN_TOY_LIB_DELETE_ERROR:
    case types.ADMIN_TOY_BOOKING_DELETE_ERROR:
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

const toyLibrariesPage = (
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

const toyBookingsPage = (
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
  toyLibraries,
  toyBookings,
  message,
  toysPage,
  categoriesPage,
  tagsPage,
  toyLibrariesPage,
  toyBookingsPage
});

export default adminToyLibraryReducer;
