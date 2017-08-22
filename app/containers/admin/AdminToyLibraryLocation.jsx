import React, { Component, PropTypes } from 'react';
import ToyLibraryForm from '../../components/ToyLibraryForm';
import { connect } from 'react-redux';
import moment from 'moment';
import { saveToyLibrary } from '../../actions/toyLibrary';
import { matchesProperty } from '../../utils/arrayUtils';
import { formatToDate, formatDateToString } from '../../utils/dateUtils';

class AdminToyLibraryLocation extends Component {

handleSubmit = (values) => {
    const {
      saveToyLibrary
    } = this.props;

    const toyLibraryId = values.toyLibraryId;
    const complement1 = values.complement1;
    const street = values.street;
    const postalCode = values.postalCode;
    const city = values.city;
    
    var openings = [];
    
    if (values.openings) {
      values.openings.forEach((op) => {
        var opening = {
          date: formatToDate(op.date),
          startTime: op.startTime,
          endTime: op.endTime
        };
        openings.push(opening);
      });
    }

    
    saveToyLibrary({
      toyLibraryId,
      openings,
      complement1,
      street,
      postalCode,
      city
    });
  }

  render() {
    
    const getToyLibraryInitialData = (toyLibrary) => {
      var initialtoyLibraryData = {
        toyLibraryId: 0 
      };

      if (toyLibrary) {
        initialtoyLibraryData.toyLibraryId = toyLibrary._id;
        
        if (toyLibrary.address) {
          initialtoyLibraryData.complement1 = toyLibrary.address.complement1;
          initialtoyLibraryData.street = toyLibrary.address.street;
          initialtoyLibraryData.postalCode = toyLibrary.address.postalCode;
          initialtoyLibraryData.city = toyLibrary.address.city;
        }
        
        initialtoyLibraryData.openings = [];
        
        if (toyLibrary.openings) {
          toyLibrary.openings.forEach(op => {
            var opening = {
              date: formatDateToString(op.date),
              startTime: moment(op.startTime),
              endTime: moment(op.endTime)
            };
            initialtoyLibraryData.openings.push(opening);
          });
        }
      }
      return initialtoyLibraryData;
    };
    
    const {toyLibraries, toyLibraryId, message} = this.props;
    
    var toyLibrary = matchesProperty(toyLibraries, ['_id', toyLibraryId]);
    
    return (
        <ToyLibraryForm initialValues={getToyLibraryInitialData(toyLibrary)} message={message} onSubmit={this.handleSubmit}/>
      );
  };
}

AdminToyLibraryLocation.propTypes = {
    toyLibraries: PropTypes.array,
    toyLibraryId: PropTypes.string,
    message: PropTypes.string,
    saveToyLibrary: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    toyLibraries: state.adminToyLibrary.toyLibraries,
    toyLibraryId: ownProps.params.id,
    message : state.adminToyLibrary.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveToyLibrary })(AdminToyLibraryLocation);
