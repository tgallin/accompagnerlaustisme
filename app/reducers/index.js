import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from '../reducers/user';
import message from '../reducers/message';
import adminUsers from '../reducers/adminUsers';
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
  routing,
  form: formReducer
});

export default rootReducer;
