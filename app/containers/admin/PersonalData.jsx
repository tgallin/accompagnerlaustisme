import React, { Component, PropTypes } from 'react';
import PersonalDataForm from '../../components/PersonalDataForm';
import { connect } from 'react-redux';
import { padStart } from '../../utils/stringUtils';
import { updatePersonalData } from '../../actions/users';

class PersonalData extends Component {

  handleSubmit = (values) => {
    
    const {
      updatePersonalData
    } = this.props;
    
    const firstname = values.firstname;
    const surname = values.surname;
    const dateOfBirthDay = values.dateOfBirthDay;
    const dateOfBirthMonth = values.dateOfBirthMonth;
    const dateOfBirthYear = values.dateOfBirthYear;
    
    var dateOfBirth;
    if (dateOfBirthDay && dateOfBirthMonth && dateOfBirthYear) {
      dateOfBirth = new Date(Date.UTC(dateOfBirthYear, dateOfBirthMonth - 1, dateOfBirthDay, 0 , 0, 0));
    }

    updatePersonalData({
      firstname,
      surname,
      dateOfBirth
    });
   
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
      var dateOfBirth = new Date(profile.dateOfBirth);
      initialPersonalData.dateOfBirthDay = padStart(dateOfBirth.getUTCDate().toString(), "00");
      initialPersonalData.dateOfBirthMonth = padStart((dateOfBirth.getUTCMonth() + 1).toString(), "00");
      initialPersonalData.dateOfBirthYear = dateOfBirth.getUTCFullYear();
    }
    
    if (initialPersonalData.firstname) {
      return (
      <PersonalDataForm onSubmit={this.handleSubmit} message={message} initialValues={initialPersonalData} />
      );
    } else {
      return (<span/>);
    }
  }
}
  
PersonalData.propTypes = {
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
export default connect(mapStateToProps, {updatePersonalData})(PersonalData);
