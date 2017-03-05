import React, { Component, PropTypes } from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm';
import ChangeEmailForm from '../components/ChangeEmailForm';
import { connect } from 'react-redux';
import {

}
from '../actions/users';

class LoginDetails extends Component {
  
    handleUpdateEmail = (values) => {

    const email = values.email;

/*      updateAccountSettings({
        email
      });*/
   
  }
  
  handleUpdatePassword = (values) => {

    const password = values.password;

/*      updateAccountSettings({
        password
      });*/
   
  }

  render() {
    const {
      message,
      email
    } = this.props.user;
    
    var initialEmail = {
      email: email
    };

  return (
    <div>
        <ChangeEmailForm onSubmit={this.handleUpdateEmail} message={message} initialValues={initialEmail} />
        <ResetPasswordForm onSubmit={this.handleUpdatePassword} message={message} />
    </div>
  );
  }
}
  
LoginDetails.propTypes = {
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
export default connect(mapStateToProps, {})(LoginDetails);
