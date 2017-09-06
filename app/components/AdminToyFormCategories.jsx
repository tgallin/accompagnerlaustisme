import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import toyValidation from '../js/toyValidation';
import RenderCheckboxesAsButtons from '../components/RenderCheckboxesAsButtons.jsx';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

let AdminToyFormCategories = (props) => {
    const { message, handleSubmit, previousPage, invalid,
      submitting, categories } = props;
      
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
      
        <FieldArray id="categories" name="categories" label="Catégories" 
        help="Vous devez sélectionner au moins une catégorie" objects={categories} component={RenderCheckboxesAsButtons} />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/toyLibrary/toys" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
              disabled={submitting}>
              <i className="fa fa-ban"/><span className={cx('hide-btn-label')}> Annuler</span>
            </Link>
            <button type="button" className={'btn btn-default active ' + cx('marginRight', 'marginBottom')} onClick={previousPage}>
              <i className={'fa fa-chevron-left'}/><span className={cx('hide-btn-label')}> Photos</span>
            </button>
            <button className={'btn btn-info ' + cx('marginRight', 'marginBottom')} type="submit"
                    disabled={invalid || submitting}>
              Mots clés <i className={'fa fa-chevron-right'}/>
            </button>
          </div>
        </div>
      </form>
      <div className={cx('paddingBottom')}>
        <Link to='/dashboard/toyLibrary/toys' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'adminToy',  // a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: toyValidation, // <--- validation function given to redux-form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AdminToyFormCategories);