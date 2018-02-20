import React, { Component, PropTypes } from 'react';
import ToyBookingForm from '../../components/ToyBookingForm';
import { connect } from 'react-redux';
import moment from 'moment';
import { saveToyBooking } from '../../actions/toyLibrary';
import { matchesProperty } from '../../js/utils/arrayUtils';

class AdminToyBooking extends Component {

handleSubmit = (values) => {
    const {
      saveToyBooking
    } = this.props;

    const toyBookingId = values.toyBookingId;
    const borrowerId = values.borrowerId;
    const toyId = values.toyId;
    const reference = values.reference;
    const start = moment(values.start, "DD/MM/YYYY");
    const end = moment(values.end, "DD/MM/YYYY");
    const returnedDate = moment(values.returnedDate, "DD/MM/YYYY");

    saveToyBooking({
      toyBookingId,
      borrowerId,
      toyId,
      reference,
      start,
      end,
      returnedDate
    });
    
  }

  render() {
    
    const getToyBookingInitialData = (toyBooking) => {
      var initialtoyBookingData = {
        toyBookingId: 0 
      };

      if (toyBooking) {
        initialtoyBookingData.toyBookingId = toyBooking._id;
        
        if (toyBooking.borrower && toyBooking.borrower.id) {
          initialtoyBookingData.borrowerId = toyBooking.borrower.id;
          initialtoyBookingData.borrower = toyBooking.borrower.profile.displayName;
          initialtoyBookingData.initialBorrower = toyBooking.borrower;
        }
        
        if (toyBooking.toy && toyBooking.toy.id) {
          initialtoyBookingData.toyId = toyBooking.toy.id;
          initialtoyBookingData.toy = toyBooking.toy.name;
          initialtoyBookingData.initialToy = toyBooking.toy;
        }
        
        initialtoyBookingData.reference = toyBooking.reference;
        
        if (toyBooking.start) {
          initialtoyBookingData.start = moment(toyBooking.start).format("DD/MM/YYYY"); 
        }
        if (toyBooking.end) {
          initialtoyBookingData.end = moment(toyBooking.end).format("DD/MM/YYYY"); 
        }
        if (toyBooking.returnedDate) {
          initialtoyBookingData.returnedDate = moment(toyBooking.returnedDate).format("DD/MM/YYYY"); 
        }
      } else {
        var now = moment();
        initialtoyBookingData.start = now.format("DD/MM/YYYY");
        initialtoyBookingData.end = now.add(1, 'months').format("DD/MM/YYYY");
      }
      return initialtoyBookingData;
    };
    
    const {toyBookings, toyBookingId, message} = this.props;
    
    var toyBooking = matchesProperty(toyBookings, ['_id', toyBookingId]);
    var initialData = getToyBookingInitialData(toyBooking);
    
    return (
        <ToyBookingForm initialValues={initialData} initialBorrower={initialData.initialBorrower} initialToy={initialData.initialToy}  message={message} onSubmit={this.handleSubmit}/>
      );
  };
}

AdminToyBooking.propTypes = {
    toyBookings: PropTypes.array,
    toyBookingId: PropTypes.string,
    message: PropTypes.string,
    saveToyBooking: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    toyBookings: state.adminToyLibrary.toyBookings,
    toyBookingId: ownProps.params.id,
    message : state.adminToyLibrary.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveToyBooking })(AdminToyBooking);
