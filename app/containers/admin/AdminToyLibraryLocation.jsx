import React, { Component, PropTypes } from 'react';
import ToyLibraryForm from '../../components/ToyLibraryForm';
import { connect } from 'react-redux';
import moment from 'moment';
import { saveToyLibrary } from '../../actions/toyLibrary';
import { matchesProperty } from '../../js/utils/arrayUtils';

class AdminToyLibraryLocation extends Component {

handleSubmit = (values) => {
    const {
      saveToyLibrary
    } = this.props;

    const toyLibraryId = values.toyLibraryId;
    const name = values.name;
    const street = values.street;
    const postalCode = values.postalCode;
    const city = values.city;
    
    var openings = [];
    
    if (values.openings) {
      values.openings.forEach((op) => {
        var opening = {
          // op.date is fomratted as "DD/MM/YYYY"
          date: moment(op.date, "DD/MM/YYYY"),
          startTime: moment(op.startTime, "DD/MM/YYYY HH:mm"),
          endTime: moment(op.endTime, "DD/MM/YYYY HH:mm")
        };
        openings.push(opening);
      });
    }
    
    const active = values.active;

    
    saveToyLibrary({
      toyLibraryId,
      name,
      openings,
      street,
      postalCode,
      city,
      active
    });
  }

  render() {
    
    const getToyLibraryInitialData = (toyLibrary) => {
      var initialtoyLibraryData = {
        toyLibraryId: 0 
      };

      if (toyLibrary) {
        initialtoyLibraryData.toyLibraryId = toyLibrary._id;
        
        initialtoyLibraryData.name = toyLibrary.name;
        
        if (toyLibrary.address) {
          initialtoyLibraryData.street = toyLibrary.address.street;
          initialtoyLibraryData.postalCode = toyLibrary.address.postalCode;
          initialtoyLibraryData.city = toyLibrary.address.city;
        }
        
        initialtoyLibraryData.openings = [];
        
        if (toyLibrary.openings) {
          toyLibrary.openings.forEach(op => {
            var opening = {};
            if (op.date) {
              opening.date = moment(op.date).format("DD/MM/YYYY"); 
            }
            if (op.startTime) {
              opening.startTime = moment(op.startTime);
            }
            if (op.endTime) {
              opening.endTime = moment(op.endTime);
            }
            initialtoyLibraryData.openings.push(opening);
          });
        }
        
        initialtoyLibraryData.active = toyLibrary.active;
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
