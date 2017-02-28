import React, { Component, PropTypes } from 'react';
import AccountSettingsForm from '../components/AccountSettingsForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import {

}
from '../actions/users';
import styles from '../css/components/login';

const cx = classNames.bind(styles);

class AccountSettings extends Component {

  handleSubmit = (values) => {

    const email = values.email;
    const password = values.password;
    const firstname = values.firstname;
    const surname = values.surname;


/*      updateAccountSettings({
        email,
        password
      });*/
   
  }

  render() {
    const {
      message
    } = this.props.user;

  return (
    <div>
      <h1>Mes infos personnelles</h1>
      <AccountSettingsForm onSubmit={this.handleSubmit} message={message} />
      <ResetPasswordForm onSubmit={this.handleSubmit} message={message} />
    </div>
  );
  }
}
  
AccountSettings.propTypes = {
  user: PropTypes.object
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({
  user
}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, {})(AccountSettings);
