import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import ToyCategoryForm from '../../components/ToyCategoryForm';
import { connect } from 'react-redux';
import {
  saveToyCategory
}
from '../../actions/toyLibrary';
//import styles from 'css/components/adminUsers';

//const cx = classNames.bind(styles);

class AdminToyCategory extends Component {


handleSubmit = (values) => {
    const {
      saveToyCategory
    } = this.props;

    const toyCatId = values.toyCatId;
    const name = values.name;

    var suggestedTags = [];
    for (var key in values) {
       if (key.startsWith('tag') && values[key]) {
         suggestedTags.push(key.split('_')[1]);
       }
    }
    
    saveToyCategory({
      toyCatId,
      name,
      suggestedTags
    });
  }

  render() {
    
    const getToyCatInitialData = (toyCat) => {
      var initialtoyCatData = {
        toyCatId: 0 
      };

      if (toyCat) {
        initialtoyCatData.toyCatId = toyCat._id;
        initialtoyCatData.name = toyCat.name;
        if (toyCat.suggestedTags && toyCat.suggestedTags.length > 0) {
          toyCat.suggestedTags.forEach(tagId => {
            initialtoyCatData['tag_' + tagId] = true;
          });
        }
      }
      console.log(initialtoyCatData);
      return initialtoyCatData;
    };
    
    const {toyCategories, toyTags, toyCatId, message} = this.props;
    
    var toyCat = toyCategories.find(tc => tc._id === toyCatId);
    
    return (
        <ToyCategoryForm initialValues={getToyCatInitialData(toyCat)} tags={toyTags} message={message} onSubmit={this.handleSubmit}/>
      );
  };
}

AdminToyCategory.propTypes = {
    toyCategories: PropTypes.array,
    toyCatId: PropTypes.string,
    message: PropTypes.string,
    saveToyCategory: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    toyCategories: state.adminToyLibrary.categories,
    toyTags: state.adminToyLibrary.tags,
    toyCatId: ownProps.params.id,
    message : state.adminToyLibrary.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveToyCategory })(AdminToyCategory);
