import React, { PropTypes } from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { connect } from 'react-redux';
import { initResetPassword } from '../actions/users';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class ForgotPassword extends React.Component {

handleSubmit = (values) => {
  
  const {
    initResetPassword
  } = this.props;
  
  var email = values.email;
  initResetPassword({email});
}

  render() {
    const {
      message
    } = this.props.user;
    
    return (
      <div>
        <div className='well'>
          <h3>Demande de réinitilisation de votre mot de passe : </h3>
          <ForgotPasswordForm onSubmit={this.handleSubmit} message={message} />
        </div>
      </div>
      );
  }
};

ForgotPassword.propTypes = {
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
export default connect(mapStateToProps, {
  initResetPassword
})(ForgotPassword);
