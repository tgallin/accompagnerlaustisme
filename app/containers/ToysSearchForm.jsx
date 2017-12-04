import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { searchToys } from '../actions/toyLibrary';
import SearchForm from '../components/SearchForm';

import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

class ToysSearchForm extends Component {

  handleSubmit = (values) => {
    const {
      searchToys
    } = this.props;

    const text = values.searchText;
    searchToys({text});
  }
  
  render() {

    return (
      <div className={cx('searchOrBrowseToys')}>
        <div className={cx('searchOrBrowseSection')}>
          <SearchForm onSubmit={this.handleSubmit} />
        </div>
        <div className={cx('searchOrBrowseSection')}>
          <Link className={'btn btn-info'} to={'/ludotheque/toys'} title='Accéder au catalogue'>
            <span className={cx('smallBrowseToysLink')}>Voir tous les jeux</span>
          </Link>
        </div>
      </div>
    );
  };
}

ToysSearchForm.propTypes = {
  searchToys: PropTypes.func.isRequired,
};

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(null, {searchToys})(ToysSearchForm);
