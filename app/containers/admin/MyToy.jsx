import React, { Component, PropTypes } from 'react';
import ToyFormDescription from '../../components/ToyFormDescription';
import ToyFormPhotos from '../../components/ToyFormPhotos';
import ToyFormCategories from '../../components/ToyFormCategories';
import ToyFormTags from '../../components/ToyFormTags';
import { connect } from 'react-redux';
import { saveToy } from '../../actions/toyLibrary';
import { matchesProperty, uniq } from '../../js/utils/arrayUtils';

class MyToy extends Component {

constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleRemoveExistingPicture = this.handleRemoveExistingPicture.bind(this);
    this.state = {
      page: 1,
      catValues: [],
      removedPictures: [],
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
    
    const toyId = values.toyId;
    
    var data = new FormData();
    data.append('toyId', toyId);
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
    if (values.tags && values.tags.length > 0) {
      values.tags.forEach((tag) => {
          for (var key in tag) {
           if (tag[key]) {
             tags.push(key);
           }
          }
        }
    );
    }
    data.append('tags', tags);
  
    saveToy(data, toyId, '/dashboard/mytoys');
  }

  render() {
    
    const { page, catValues, removedPictures, firstNav } = this.state;
    
    const getToyInitialData = (toy) => {
      var initialtoyData = {
        toyId: 0 
      };
      
      if (toy) {
        initialtoyData.toyId = toy._id;
        initialtoyData.name = toy.name;
        if (toy.content) {
          initialtoyData.content = toy.content;
        }
        if (toy.description) {
          initialtoyData.description = toy.description;
        }
        
        initialtoyData.categories = [];
        
        toyCategories.forEach(c => {
          var cat = {};
          // indexOf returns -1 if elt doesn't exist in the collection
          cat[c._id] = toy.categories.indexOf(c._id) !== -1;
          initialtoyData.categories.push(cat);
        });

        initialtoyData.tags = [];
        toyTags.forEach(t => {
          var tag = {};
          tag[t._id] = toy.tags.indexOf(t._id) !== -1;
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
               var toyCat = matchesProperty(toyCategories, ['_id', key]);
               if (toyCat !== undefined && toyCat !== null) {
                tags = tags.concat(toyCat.suggestedTags);
               }
             }
            }
          }
        );
      }
      tags = uniq(tags);
      return tags;
    };

    var toy = matchesProperty(toys, ['_id', toyId]);
    
    return (
      <div>
        {page === 1 && firstNav && <ToyFormDescription initialValues={getToyInitialData(toy)} onSubmit={this.nextPage} message={message} />}
        {page === 1 && !firstNav && <ToyFormDescription onSubmit={this.nextPage} message={message} />}
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
