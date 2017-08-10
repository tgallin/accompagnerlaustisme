import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from '../reducers/user';
import message from '../reducers/message';
import adminUsers from '../reducers/adminUsers';
import adminToyLibrary from '../reducers/adminToyLibrary';
import toyLibrary from '../reducers/toyLibrary';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.SEND_MESSAGE:
    case types.INIT_RESET_PASSWORD:
    case types.COMPLETE_RESET_PASSWORD:
    case types.UPDATE_PERSONAL_DATA:
    case types.UPDATE_CONTACT_DETAILS:
    case types.UPDATE_EMAIL:
    case types.UPDATE_PASSWORD:
    case types.ADMIN_USER_SAVE:
    case types.ADMIN_USER_DELETE:
    case types.ADMIN_TOY_SAVE:
    case types.ADMIN_TOY_CAT_SAVE:
    case types.ADMIN_TOY_TAG_SAVE:
    case types.ADMIN_TOY_CAT_DELETE:
    case types.ADMIN_TOY_TAG_DELETE:
    case types.TOY_SAVE:
    case types.TOY_DELETE:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.SEND_MESSAGE_SUCCESS:
    case types.INIT_RESET_PASSWORD_SUCCESS:
    case types.COMPLETE_RESET_PASSWORD_SUCCESS:
    case types.UPDATE_PERSONAL_DATA_SUCCESS:  
    case types.UPDATE_CONTACT_DETAILS_SUCCESS:
    case types.UPDATE_EMAIL_SUCCESS:
    case types.UPDATE_PASSWORD_SUCCESS:
    case types.ADMIN_USER_SAVE_SUCCESS:
    case types.ADMIN_USER_DELETE_SUCCESS:
    case types.ADMIN_TOY_CREATE_SUCCESS:
    case types.ADMIN_TOY_CAT_CREATE_SUCCESS:
    case types.ADMIN_TOY_TAG_CREATE_SUCCESS:
    case types.ADMIN_TOY_UPDATE_SUCCESS:
    case types.ADMIN_TOY_CAT_UPDATE_SUCCESS:
    case types.ADMIN_TOY_TAG_UPDATE_SUCCESS:
    case types.ADMIN_TOY_CAT_DELETE_SUCCESS:
    case types.ADMIN_TOY_TAG_DELETE_SUCCESS:  
    case types.TOY_CREATE_SUCCESS:
    case types.TOY_UPDATE_SUCCESS:
    case types.TOY_DELETE_SUCCESS:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
    case types.SEND_MESSAGE_ERROR:
    case types.INIT_RESET_PASSWORD_ERROR:
    case types.COMPLETE_RESET_PASSWORD_ERROR:
    case types.UPDATE_PERSONAL_DATA_ERROR:
    case types.UPDATE_CONTACT_DETAILS_ERROR:
    case types.UPDATE_EMAIL_ERROR:
    case types.UPDATE_PASSWORD_ERROR:
    case types.ADMIN_USER_SAVE_ERROR:
    case types.ADMIN_USER_DELETE_ERROR:
    case types.ADMIN_TOY_SAVE_ERROR:
    case types.ADMIN_TOY_CAT_DUPLICATE:
    case types.ADMIN_TOY_CAT_SAVE_ERROR:
    case types.ADMIN_TOY_CAT_DELETE_ERROR:
    case types.ADMIN_TOY_TAG_DUPLICATE:
    case types.ADMIN_TOY_TAG_SAVE_ERROR:
    case types.ADMIN_TOY_TAG_DELETE_ERROR:
    case types.TOY_SAVE_ERROR:
    case types.TOY_DELETE_ERROR:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  isWaiting,
  user,
  message,
  adminUsers,
  adminToyLibrary,
  toyLibrary,
  routing,
  form: formReducer
});

export default rootReducer;
