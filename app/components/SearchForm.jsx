import React from 'react';
import { Field, reduxForm } from 'redux-form';
import searchValidation from '../js/validation/searchValidation';

import classNames from 'classnames/bind';
import styles from 'css/components/toyLibrary';

const cx = classNames.bind(styles);

const SearchForm = (props) => {
  const { message, handleSubmit, invalid, submitting } = props;
  return (
    <form className="form-inline" onSubmit={handleSubmit}>
    {message && <div className="alert alert-danger" role="alert">{message}</div>}
      <div className="form-group">
        <label htmlFor="searchText" className={cx('search-label')}>Rechercher</label>
        <Field component="input" type="text" className={'form-control ' + cx('search-control')} id="searchText" name="searchText" />
        <button type="submit" className="btn" disabled={invalid || submitting}><i className="fa fa-search" /></button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'search',  // a unique identifier for this form
  validate: searchValidation                // <--- validation function given to redux-form
})(SearchForm);