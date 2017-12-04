import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import ToyCategoryForm from '../../components/ToyCategoryForm';
import { connect } from 'react-redux';
import { saveToyCategory } from '../../actions/toyLibrary';
import { matchesProperty } from '../../js/utils/arrayUtils';

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
    values.tags.forEach((tag) => {
        for (var key in tag) {
         if (tag[key]) {
           suggestedTags.push(key);
         }
        }
      }
    );
    
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
        initialtoyCatData.tags = [];
        toyTags.forEach(t => {
          var tag = {};
          var foundTag = matchesProperty(toyCat.suggestedTags, ['_id', t._id]);
          // if true checkbox will be checked
          tag[t._id] = foundTag !== undefined && foundTag !== null;
          initialtoyCatData.tags.push(tag);
        });
      }
      return initialtoyCatData;
    };
    
    const {toyCategories, toyTags, toyCatId, message} = this.props;
    
    var toyCat = matchesProperty(toyCategories, ['_id', toyCatId]);
    
    return (
        <ToyCategoryForm initialValues={getToyCatInitialData(toyCat)} tags={toyTags} message={message} onSubmit={this.handleSubmit}/>
      );
  };
}

AdminToyCategory.propTypes = {
    toyCategories: PropTypes.array,
    toyCatId: PropTypes.string,
    toyTags: PropTypes.array,
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
