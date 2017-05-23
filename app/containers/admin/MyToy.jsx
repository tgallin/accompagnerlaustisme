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
    this.handleRemoveExistingPicture = this.handleRemoveExistingPicture.bind(this);
    this.state = {
      page: 1,
      catValues: [],
      removedPictures: []
    };
  }

  nextPage(values) {
    this.setState({
      page: this.state.page + 1,
      catValues: values.categories
    });
  }

  previousPage() {
    this.setState({page: this.state.page - 1});
  }

  handleRemoveExistingPicture = (id) => {
    this.setState({
      removedPictures: this.state.removedPictures.concat([id])
    });
  }

  handleSubmit = (values) => {
    const {
      saveToy
    } = this.props;
    
    const { removedPictures } = this.state;
    
    var data = new FormData();
    data.append('toyId', values.toyId);
    data.append('name', values.name);
    if (values.content && values.content !== '') {
      data.append('content', values.content);
    } else {
       data.append('content', '');
    }
    if (values.description && values.description !== '') {
      data.append('description', values.description);
    } else {
       data.append('description', '');
    }
    
    if (values.pictures && values.pictures.length > 0) {
      // we remove from the list pictures whose size is > 3MB
      var files = values.pictures.filter(p => p.size < 3000000);

      files.forEach((file, i) => {
        data.append('pictures[' + i + ']', file);
      });
    }
    
    if (removedPictures && removedPictures.length > 0) {
      data.append('removedPictures', removedPictures);
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
    
    const { page, catValues, removedPictures } = this.state;
    
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
          cat[c._id] = _.includes(toy.categories, c._id);
          initialtoyData.categories.push(cat);
        });

        initialtoyData.tags = [];
        toyTags.forEach(t => {
          var tag = {};
          tag[t._id] = _.includes(toy.tags, t._id);
          initialtoyData.tags.push(tag);
        });
      }
      
      return initialtoyData;
      
    };
    
    const getToyPictures = (toy) => {
      var existingPictures = [];
      if (toy) {
        existingPictures = toy.pictures.filter(p => !removedPictures.includes(p.public_id));
      }
      return existingPictures;
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
        {page === 1 && <ToyFormDescription initialValues={getToyInitialData(toy)} onSubmit={this.nextPage} message={message} />}
        {page === 2 &&
          <ToyFormPhotos
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            message={message}
            existingPictures={getToyPictures(toy)}
            handleRemoveExistingPicture={this.handleRemoveExistingPicture}
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
    message : state.user.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveToy })(MyToy);
