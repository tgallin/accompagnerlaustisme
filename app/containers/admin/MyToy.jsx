import React, { Component, PropTypes } from 'react';
import ToyFormDescription from '../../components/ToyFormDescription';
import ToyFormPhotos from '../../components/ToyFormPhotos';
import ToyFormCategories from '../../components/ToyFormCategories';
import ToyFormTags from '../../components/ToyFormTags';
import { connect } from 'react-redux';
import { saveToy } from '../../actions/toyLibrary';
import _ from 'lodash';

import classNames from 'classnames/bind';
import inputStyles from '../../css/common/inputs';
const cy = classNames.bind(inputStyles);

class MyToy extends Component {

constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      catValues: [],
      firstNav: true
    };
  }

nextPage(values) {
  this.setState({
    page: this.state.page + 1,
    catValues: values.categories,
    firstNav: false
  });
}

previousPage() {
  this.setState({page: this.state.page - 1});
}

handleSubmit = (values) => {
    const {
      saveToy
    } = this.props;
    
    var data = new FormData();
    data.append('toyId', values.toyId);
    data.append('name', values.name);
    data.append('content', values.content);
    data.append('description', values.description);
    
    if (values.pictures && values.pictures.length > 0) {
      // we remove from the list pictures whose size is > 3MB
      var files = values.pictures.filter(p => p.size < 3000000);

      files.forEach((file, i) => {
        data.append('pictures[' + i + ']', file);
      });
    }
    
    var categories = [];
    values.categories.forEach((cat) => {
        for (var key in cat) {
         if (cat[key]) {
           categories.push(key);
         }
        }
      }
    );
    data.append('categories', categories);
    
    var tags = [];
    values.tags.forEach((tag) => {
        for (var key in tag) {
         if (tag[key]) {
           tags.push(key);
         }
        }
      }
    );
    data.append('tags', tags);
  
    saveToy(data);
  }

  render() {
    
    const { page, catValues, firstNav } = this.state;
    
    const getToyInitialData = (toy) => {
      var initialtoyData = {
        toyId: 0 
      };
      
      if (toy) {
        initialtoyData.toyId = toy._id;
        initialtoyData.name = toy.name;
        initialtoyData.content = toy.content;
        initialtoyData.description = toy.description;
        
        initialtoyData.categories = [];
        toyCategories.forEach(c => {
          var cat = {};
          cat[c._id] = _.isNil(_.find(toy.categories, ['_id', c._id]));
          initialtoyData.categories.push(cat);
        });
        
        initialtoyData.tags = [];
        toyTags.forEach(t => {
          var tag = {};
          tag[t._id] = _.isNil(_.find(toy.tags, ['_id', t._id]));
          initialtoyData.tags.push(tag);
        });
      }
      return initialtoyData;
      
    };
    
    const {toys, toyId, toyCategories, toyTags, message} = this.props;
    
    
    const getSuggestedTags = (catValues, toyCategories) => {
      var tags = [];
      if (catValues) {
        catValues.forEach((catValue) => {
            for (var key in catValue) {
             if (catValue[key]) {
               // category is selected
               var toyCat = _.find(toyCategories, ['_id', key]);
               if (toyCat) {
                tags = tags.concat(toyCat.suggestedTags);
               }
             }
            }
          }
        );
      }
      tags = _.uniq(tags);
      return tags;
    };

    var toy = _.find(toys, ['_id', toyId]);
    
    return (
      <div>
        {page === 1 && firstNav && <ToyFormDescription initialValues={getToyInitialData(toy)} onSubmit={this.nextPage} message={message} />}
        {page === 1 && !firstNav && <ToyFormDescription onSubmit={this.nextPage} message={message} />}
        {page === 2 &&
          <ToyFormPhotos
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            message={message}
          />}
        {page === 3 &&
          <ToyFormCategories
            categories={toyCategories}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            message={message}
          />}
        {page === 4 &&
          <ToyFormTags
            previousPage={this.previousPage}
            tags={toyTags}
            suggestedTags={getSuggestedTags(catValues, toyCategories)}
            onSubmit={this.handleSubmit}
            message={message}
          />}
          
      </div>
      );
  };
}

MyToy.propTypes = {
    toys: PropTypes.array,
    toyId: PropTypes.string,
    toyCategories: PropTypes.array,
    toyTags: PropTypes.array,
    message: PropTypes.string,
    saveToy: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    toys: state.user.toys,
    toyId: ownProps.params.id,
    toyCategories: state.adminToyLibrary.categories,
    toyTags: state.adminToyLibrary.tags,
    message : state.adminToyLibrary.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveToy })(MyToy);
