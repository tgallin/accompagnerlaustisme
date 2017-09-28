import React, { Component, PropTypes } from 'react';
import AdminToyFormDescription from '../../components/AdminToyFormDescription';
import AdminToyFormPhotos from '../../components/AdminToyFormPhotos';
import AdminToyFormCategories from '../../components/AdminToyFormCategories';
import AdminToyFormTags from '../../components/AdminToyFormTags';
import AdminToyFormAdmin from '../../components/AdminToyFormAdmin';
import { connect } from 'react-redux';
import moment from 'moment';
import { saveToy } from '../../actions/toyLibrary';
import { matchesProperty, uniq } from '../../utils/arrayUtils';

class AdminToy extends Component {

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

    data.append('approved', values.approved);
    data.append('online', values.online);
    
    if (values.ownerId) {
      data.append('ownerId', values.ownerId);
    }
    
    if (values.productCode && values.productCode !== '') {
      data.append('productCode', values.productCode);
    } else {
       data.append('productCode', '');
    }
    
    var copies = [];
    if (values.copies && values.copies.length > 0) {
      values.copies.forEach((c) => {
        var copy = {
          reference: c.reference,
          toyLibraryId: c.toyLibraryId
        };
        copies.push(copy);
      });
    }
    data.append('copies', JSON.stringify(copies));
    
    var comments = [];
    if (values.comments && values.comments.length > 0) {
      values.comments.forEach((c) => {
          var comment = {
            // op.date is formatted as "DD/MM/YYYY"
            date: moment(c.date, "DD/MM/YYYY"),
            comment: c.comment
          };
          comments.push(comment);
      });
    }
    data.append('comments', JSON.stringify(comments));
  
    saveToy(data, toyId, '/dashboard/toyLibrary/toys');
  }

  render() {
   
   const { page, catValues, removedPictures, firstNav } = this.state;
    
    const getToyInitialData = (toy) => {
      var initialtoyData = {
        toyId: 0,
        approved: false,
        online: false,
        copies: [{}]
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
        
        initialtoyData.approved = toy.approved;
        initialtoyData.online = toy.online;
        initialtoyData.ownerId = toy.owner.id;
        initialtoyData.owner = toy.owner.profile.displayName;
        initialtoyData.initialOwner = toy.owner;
        
        if (toy.productCode) {
          initialtoyData.productCode = toy.productCode;
        }
        
        initialtoyData.comments = [];
        if (toy.comments && toy.comments.length > 0) {
          toy.comments.forEach(c => {
            var comment = {
              date: moment(c.date).format('DD/MM/YYYY'),
              comment: c.comment
            };
            initialtoyData.comments.push(comment);
          });
        }

        initialtoyData.copies = [];
        if (toy.copies && toy.copies.length > 0) {
          toy.copies.forEach(c => {
            var copy = {
              reference: c.reference,
              toyLibraryId: c.toyLibrary
            };
            initialtoyData.copies.push(copy);
          });
        } else {
          initialtoyData.copies.push({
            reference: ''
          });
        }
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
    
    const {toys, toyId, toyCategories, toyTags, toyLibraries, message} = this.props;

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
    var initialData = getToyInitialData(toy);
    
    return (
      <div>
        {page === 1 && firstNav && <AdminToyFormDescription initialValues={initialData} onSubmit={this.nextPage} message={message} />}
        {page === 1 && !firstNav && <AdminToyFormDescription onSubmit={this.nextPage} message={message} />}
        {page === 2 &&
          <AdminToyFormPhotos
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            message={message}
            existingPictures={getToyPictures(toy)}
            handleRemoveExistingPicture={this.handleRemoveExistingPicture}
          />}
        {page === 3 &&
          <AdminToyFormCategories
            categories={toyCategories}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            message={message}
          />}
        {page === 4 &&
          <AdminToyFormTags
            previousPage={this.previousPage}
            tags={toyTags}
            suggestedTags={getSuggestedTags(catValues, toyCategories)}
            onSubmit={this.nextPage}
            message={message}
          />}
        {page === 5 &&
          <AdminToyFormAdmin
            toyLibraries={toyLibraries}
            previousPage={this.previousPage}
            onSubmit={this.handleSubmit}
            message={message}
            initialOwner={initialData.initialOwner}
            initialComments={initialData.comments}
          />}
          
      </div>
      );
  };
}

AdminToy.propTypes = {
    toys: PropTypes.array,
    toyId: PropTypes.string,
    toyCategories: PropTypes.array,
    toyTags: PropTypes.array,
    toyLibraries: PropTypes.array,
    message: PropTypes.string,
    saveToy: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    toys: state.adminToyLibrary.toys,
    toyId: ownProps.params.id,
    toyCategories: state.adminToyLibrary.categories,
    toyTags: state.adminToyLibrary.tags,
    toyLibraries: state.adminToyLibrary.toyLibraries,
    message : state.user.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { saveToy })(AdminToy);