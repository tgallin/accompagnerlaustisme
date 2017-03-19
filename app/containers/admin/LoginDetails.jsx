import React, { Component, PropTypes } from 'react';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import ChangeEmailForm from '../../components/ChangeEmailForm';
import { connect } from 'react-redux';
import { updateEmail, updatePassword } from '../../actions/users';

class LoginDetails extends Component {
  
  handleUpdateEmail = (values) => {
      
    const {
      updateEmail
    } = this.props;

    const email = values.email;

    updateEmail({
      email
    });
   
  }
  
  handleUpdatePassword = (values) => {

    const {
      updatePassword
    } = this.props;

    const password = values.password;

    updatePassword({
      password
    });
   
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
        {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <ChangeEmailForm onSubmit={this.handleUpdateEmail} initialValues={initialEmail} />
        <ResetPasswordForm onSubmit={this.handleUpdatePassword} />
    </div>
  );
  }
}
  
LoginDetails.propTypes = {
  user: PropTypes.object
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, {updateEmail, updatePassword})(LoginDetails);
