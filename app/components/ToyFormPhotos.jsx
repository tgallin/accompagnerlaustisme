import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import toyValidation from '../js/toyValidation';
import RenderDropzoneInput from '../components/RenderDropzoneInput.jsx';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

let ToyFormPhotos = (props) => {
    const { message, handleSubmit, previousPage, invalid,
      submitting } = props;
      
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field
          name="pictures"
          component={RenderDropzoneInput} label="Photos"
        />
        
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/mytoys" className={'btn btn-default ' + cx('marginRight')}
              disabled={submitting}>
              <i className="fa fa-ban"/> Annuler
            </Link>
            <button type="button" className={'btn btn-default active ' + cx('marginRight')} onClick={previousPage}>
              <i className={'fa fa-chevron-left'}/> Description
            </button>
            <button className={'btn btn-info ' + cx('marginRight')} type="submit"
                    disabled={invalid || submitting}>
              Catégories <i className={'fa fa-chevron-right'}/>
            </button>
          </div>
        </div>
      </form>
      <div className={cx('paddingBottom')}>
        <Link to='/dashboard/mytoys' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'myToy',  // a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: toyValidation                // <--- validation function given to redux-form
})(ToyFormPhotos);