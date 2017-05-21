import * as types from '../types';

/*
 * Message store for global messages, i.e. Network messages / Redirect messages
 * that need to be communicated on the page itself. Ideally
 * messages/notifications should appear within the component to give the user
 * more context. - My 2 cents.
 */
export default function message(state = {
  message: '',
  type: 'SUCCESS'
}, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.SEND_MESSAGE_SUCCESS:
    case types.INIT_RESET_PASSWORD_SUCCESS:
    case types.COMPLETE_RESET_PASSWORD_SUCCESS:
    case types.UPDATE_PERSONAL_DATA_SUCCESS:  
    case types.UPDATE_CONTACT_DETAILS_SUCCESS:
    case types.UPDATE_EMAIL_SUCCESS:
    case types.UPDATE_PASSWORD_SUCCESS:
    case types.ADMIN_USER_SAVE_SUCCESS:
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
      return {...state, message: action.message, type: 'SUCCESS'};
    case types.LOGOUT_SUCCESS_USER:
      return {...state, message: action.message, type: 'INFO'};
    case types.DISMISS_MESSAGE:
    case types.CREATE_REQUEST:
      return {...state, message: '', type: 'SUCCESS'};
    default:
      return state;
  }
}
