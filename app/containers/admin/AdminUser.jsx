import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { matchesProperty } from '../../utils/arrayUtils';
import { padStart } from '../../utils/stringUtils';
import UserForm from '../../components/UserForm';
import { connect } from 'react-redux';
import { saveUser } from '../../actions/adminUsers';

//import styles from 'css/components/adminUsers';

//const cx = classNames.bind(styles);

class AdminUser extends Component {


handleSubmit = (values) => {
    const {
      saveUser
    } = this.props;
    const admin = values.admin;
    const member = values.member;
    var memberFrom = null;
    var memberTo = null;
    if (member) {
      memberFrom = this.formatToDate(values.memberFrom);
      memberTo = this.formatToDate(values.memberTo);
    }

    const userId = values.userId;

    saveUser({
      userId,
      admin,
      member,
      memberFrom,
      memberTo
    });
  }

formatToDate(value) {
  var result = null;
  if (value && value !== '') {
    var dateParts = value.split("/");
    // we want to convert DD/MM/YYYY to YYYY/MM/DD
    result = new Date(Date.UTC(dateParts[2], dateParts[1] - 1, dateParts[0], 0 , 0, 0));
  }
  return result;
}

formatDateToString(value) {
  var result = '';
  if (value && value !== '') {
    var date = new Date(value);
    var dateParts = [];
    dateParts.push(padStart(date.getUTCDate().toString(), "00"));
    dateParts.push(padStart((date.getUTCMonth() + 1).toString(), "00"));
    dateParts.push(date.getUTCFullYear());
    result = dateParts.join('/');
  } 
  return result;
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
        if (user.membership) {
          initialUserData.member = user.membership.member;
          initialUserData.memberFrom = this.formatDateToString(user.membership.from);
          initialUserData.memberTo = this.formatDateToString(user.membership.to);
        }
        
        if (user.profile.address) {
          initialUserData.address = user.profile.address;
        }
        
        initialUserData.landline = user.profile.landline;
        initialUserData.mobile = user.profile.mobile;
      }
      return initialUserData;
    };
    
    const {users, userId, message} = this.props;
    
    var user = matchesProperty(users, ['_id', userId]);
    
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
