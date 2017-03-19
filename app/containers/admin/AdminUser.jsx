import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import UserForm from '../../components/UserForm';
import { connect } from 'react-redux';
import {
  saveUser
}
from '../../actions/adminUsers';
//import styles from 'css/components/adminUsers';

//const cx = classNames.bind(styles);

class AdminUser extends Component {


handleSubmit = (values) => {
    const {
      saveUser
    } = this.props;
    const admin = values.admin;
    const member = values.member;
    const userId = values.userId;

    saveUser({
      userId,
      admin,
      member
    });
  }

  render() {
    
    const getUserInitialData = (user) => {
      var initialUserData = {};

      if (user) {
        initialUserData.userId = user._id;
        initialUserData.firstname = user.profile.firstname;
        initialUserData.surname = user.profile.surname;
        initialUserData.email = user.email;
        initialUserData.admin = user.admin;
        initialUserData.member = user.member;
        if (user.profile.address) {
          initialUserData.address = user.profile.address;
        }
        
        initialUserData.landline = user.profile.landline;
        initialUserData.mobile = user.profile.mobile;
      }
      return initialUserData;
    };
    
    const {users, userId, message} = this.props;
    
    var user = users.find(u => u._id === userId);
    
    if (user) {
      return (
        <UserForm initialValues={getUserInitialData(user)} message={message} onSubmit={this.handleSubmit}/>
      );
    } else {
      return (<span/>);
    }
  };
}

AdminUser.propTypes = {
    users: PropTypes.array,
    userId: PropTypes.string,
    message: PropTypes.string,
    saveUser: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.adminUsers.users,
    userId: ownProps.params.id,
    message : state.adminUsers.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveUser })(AdminUser);
