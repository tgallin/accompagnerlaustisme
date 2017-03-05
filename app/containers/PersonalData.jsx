import React, { Component, PropTypes } from 'react';
import PersonalDataForm from '../components/PersonalDataForm';
import { connect } from 'react-redux';
import {

}
from '../actions/users';

class PersonalData extends Component {

  handleSubmit = (values) => {
    const firstname = values.firstname;
    const surname = values.surname;


/*      updateAccountSettings({
        firstname,
        surname
      });*/
   
  }

  render() {
    const {
      message,
      profile
    } = this.props.user;
    
    var initialPersonalData = {
      firstname: profile.firstname,
      surname: profile.surname,
    };
    if (profile.dateOfBirth) {
      initialPersonalData.dateOfBirthDay = profile.dateOfBirth.getUTCDate();
      initialPersonalData.dateOfBirthMonth = profile.dateOfBirth.getUTCMonth() + 1;
      initialPersonalData.dateOfBirthYear = profile.dateOfBirth.getUTCFullYear();
    }

  return (
      <PersonalDataForm onSubmit={this.handleSubmit} message={message} initialValues={initialPersonalData} />
  );
  }
}
  
PersonalData.propTypes = {
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
export default connect(mapStateToProps, {})(PersonalData);
