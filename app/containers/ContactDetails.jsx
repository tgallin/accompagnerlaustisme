import React, { Component, PropTypes } from 'react';
import IndividualAddressForm from '../components/IndividualAddressForm';
import { connect } from 'react-redux';
import {

}
from '../actions/users';

class ContactDetails extends Component {

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
    
    var initialAddressData = {};
    if (profile.address) {
      initialAddressData.complement1 = profile.address.complement1;
      initialAddressData.complement2 = profile.address.complement2;
      initialAddressData.street = profile.address.street;
      initialAddressData.complement3 = profile.address.complement3;
      initialAddressData.postalCode = profile.address.postalCode;
      initialAddressData.city = profile.address.city;
    }

    return (
      <div>
        <h3>Adresse postale</h3>
        <IndividualAddressForm onSubmit={this.handleSubmit} message={message} initialValues={initialAddressData} />
      </div>
    );
  }
}
  
ContactDetails.propTypes = {
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
export default connect(mapStateToProps, {})(ContactDetails);
