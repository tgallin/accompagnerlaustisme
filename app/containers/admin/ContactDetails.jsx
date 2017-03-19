import React, { Component, PropTypes } from 'react';
import ContactDetailsForm from '../../components/ContactDetailsForm';
import { connect } from 'react-redux';
import { updateContactDetails } from '../../actions/users';

class ContactDetails extends Component {

  handleSubmit = (values) => {
    const {
      updateContactDetails
    } = this.props;
    
    const mobile = values.mobile;
    const landline = values.landline;
    const complement1 = values.complement1;
    const complement2 = values.complement2;
    const street = values.street;
    const complement3 = values.complement3;
    const postalCode = values.postalCode;
    const city = values.city;

    updateContactDetails({
      mobile,
      landline,
      complement1,
      complement2,
      street,
      complement3,
      postalCode,
      city
    });
   
  }

  render() {
    const {
      message,
      profile
    } = this.props.user;
    
    var initialContactDetailsData = {};
    if (profile) {
      initialContactDetailsData.mobile = profile.mobile;
      initialContactDetailsData.landline = profile.landline;
    }
    if (profile.address) {
      initialContactDetailsData.complement1 = profile.address.complement1;
      initialContactDetailsData.complement2 = profile.address.complement2;
      initialContactDetailsData.street = profile.address.street;
      initialContactDetailsData.complement3 = profile.address.complement3;
      initialContactDetailsData.postalCode = profile.address.postalCode;
      initialContactDetailsData.city = profile.address.city;
    }

    return (
      <ContactDetailsForm onSubmit={this.handleSubmit} message={message} initialValues={initialContactDetailsData} />
    );
  }
}
  
ContactDetails.propTypes = {
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
export default connect(mapStateToProps, {updateContactDetails})(ContactDetails);
