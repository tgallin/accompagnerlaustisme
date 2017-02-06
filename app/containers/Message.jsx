import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from '../actions/messages';
import styles from '../css/components/message';

const cx = classNames.bind(styles);

function getClass(type) {
  switch (type) {
    case 'SUCCESS':
      return 'alert-success ';
    case 'INFO':
      return 'alert-info ';
    case 'WARNING':
      return 'alert-warning ';
    case 'ERROR':
      return 'alert-danger ';
    default:
      return 'alert-info ';
  }
}

const Message = ({message, type, dismissMessage}) => (
  <div role="alert"
    className={'alert '+ getClass(type) + cx('hide', {
      show: message && message.length > 0
    })}
    onClick={dismissMessage}>{message}</div>
);

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps, { dismissMessage })(Message);
