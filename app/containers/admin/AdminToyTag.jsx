import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import ToyTagForm from '../../components/ToyTagForm';
import { connect } from 'react-redux';
import { saveToyTag } from '../../actions/toyLibrary';
import _ from 'lodash';

//import styles from 'css/components/adminUsers';

//const cx = classNames.bind(styles);

class AdminToyTag extends Component {


handleSubmit = (values) => {
    const {
      saveToyTag
    } = this.props;

    const toyTagId = values.toyTagId;
    const name = values.name;

    saveToyTag({
      toyTagId,
      name
    });
  }

  render() {
    
    const getToyTagInitialData = (toyTag) => {
      var initialtoyTagData = {
        toyTagId: 0 
      };

      if (toyTag) {
        initialtoyTagData.toyTagId = toyTag._id;
        initialtoyTagData.name = toyTag.name;
      }
      return initialtoyTagData;
    };
    
    const {toyTags, toyTagId, message} = this.props;
    
    var toyTag = _.find(toyTags, ['_id', toyTagId]);
    
    return (
        <ToyTagForm initialValues={getToyTagInitialData(toyTag)} message={message} onSubmit={this.handleSubmit}/>
      );
  };
}

AdminToyTag.propTypes = {
    toyTags: PropTypes.array,
    toyTagId: PropTypes.string,
    message: PropTypes.string,
    saveToyTag: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    toyTags: state.adminToyLibrary.tags,
    toyTagId: ownProps.params.id,
    message : state.adminToyLibrary.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveToyTag })(AdminToyTag);
