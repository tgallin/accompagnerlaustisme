import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import AdminToyForm from '../../components/AdminToyForm';
import { connect } from 'react-redux';
import { changeApprobationToy } from '../../actions/toyLibrary';
import { matchesProperty } from '../../utils/arrayUtils';

//import styles from 'css/components/adminUsers';

//const cx = classNames.bind(styles);

class AdminToy extends Component {


handleSubmit = (values) => {
    const {
      changeApprobationToy
    } = this.props;

    const toyId = values.toyId;
    const approved = values.approved;

    changeApprobationToy({
      toyId,
      approved
    });
  }

  render() {
    
    const getToyInitialData = (toy) => {
      var initialtoyData = {};

      if (toy) {
        initialtoyData.toyId = toy._id;
        initialtoyData.name = toy.name;
        initialtoyData.content = toy.content;
        initialtoyData.description = toy.description;
        var pictureUrls = [];
        toy.pictures.forEach(p => pictureUrls.push(p.eager[2].secure_url) );
        initialtoyData.pictureUrls = pictureUrls;
        var categories = [];
        toy.categories.forEach(c => categories.push(c.name) );
        initialtoyData.categories = categories.join(', ');
        var tags = [];
        toy.tags.forEach(t => tags.push(t.name) );
        initialtoyData.tags = tags.join(', ');
        initialtoyData.approved = toy.approved;
      }
      return initialtoyData;
    };
    
    const {toys, toyId, message} = this.props;
    
    var toy = matchesProperty(toys, ['_id', toyId]);
    
    return (
        <AdminToyForm initialValues={getToyInitialData(toy)} message={message} onSubmit={this.handleSubmit}/>
      );
  };
}

AdminToy.propTypes = {
    toys: PropTypes.array,
    toyId: PropTypes.string,
    message: PropTypes.string,
    changeApprobationToy: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    toys: state.adminToyLibrary.toys,
    toyId: ownProps.params.id,
    message : state.adminToyLibrary.message
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { changeApprobationToy })(AdminToy);
