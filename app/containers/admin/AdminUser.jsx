import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { matchesProperty } from '../../utils/arrayUtils';
import { formatToDate, formatDateToString } from '../../utils/dateUtils';
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
      memberFrom = formatToDate(values.memberFrom);
      memberTo = formatToDate(values.memberTo);
    }
    
    const legalStatus = values.legalStatus;
    var firstname;
    var surname;
    var entityName;
    if (legalStatus==='P') {
      firstname = values.firstname;
      surname = values.surname;
      entityName = '';
    } else {
      firstname = '';
      surname = '';
      entityName = values.entityName;
    }

    const email = values.email;

    const mobile = values.mobile;
    const landline = values.landline;
    const complement1 = values.complement1;
    const complement2 = values.complement2;
    const street = values.street;
    const complement3 = values.complement3;
    const postalCode = values.postalCode;
    const city = values.city;

    const userId = values.userId;

    saveUser({
      userId,
      admin,
      member,
      memberFrom,
      memberTo,
      legalStatus,
      firstname,
      surname,
      entityName,
      email,
      mobile,
      landline,
      complement1,
      complement2,
      complement3,
      street,
      postalCode,
      city
    });
  }

  render() {
    
    const getUserInitialData = (user) => {
      var initialUserData = {
        userId: 0,
        legalStatus: 'P'
      };
      
      if (user) {
        initialUserData.userId = user._id;
        initialUserData.legalStatus = user.profile.legalStatus || 'P';
        initialUserData.entityName = user.profile.entityName;
        initialUserData.firstname = user.profile.firstname;
        initialUserData.surname = user.profile.surname;
        initialUserData.email = user.email;
        initialUserData.admin = user.admin;
        if (user.membership) {
          initialUserData.member = user.membership.member;
          initialUserData.memberFrom = formatDateToString(user.membership.from);
          initialUserData.memberTo = formatDateToString(user.membership.to);
        }
        
        if (user.profile.address) {
          initialUserData.complement1 = user.profile.address.complement1;
          initialUserData.complement2 = user.profile.address.complement2;
          initialUserData.street = user.profile.address.street;
          initialUserData.complement3 = user.profile.address.complement3;
          initialUserData.postalCode = user.profile.address.postalCode;
          initialUserData.city = user.profile.address.city;
        }
        
        initialUserData.landline = user.profile.landline;
        initialUserData.mobile = user.profile.mobile;
      }
      return initialUserData;
    };
    
    const {users, userId, message} = this.props;
    
    var user = matchesProperty(users, ['_id', userId]);
    
    return (
      <UserForm initialValues={getUserInitialData(user)} message={message} onSubmit={this.handleSubmit}/>
    );
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
