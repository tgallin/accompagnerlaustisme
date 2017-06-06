import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import toyCategoryValidation from '../js/toyCategoryValidation';
import RenderField from '../components/RenderField.jsx';
import RenderCheckboxesAsButtons from '../components/RenderCheckboxesAsButtons.jsx';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

let ToyCategoryForm = (props) => {
    const { message, handleSubmit, invalid,
      pristine, submitting, tags } = props;
      
  return (
      <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="toyCatId" id="toyCatId" component="input" type="hidden"/>
        <Field name="name" type="text" size="2-10" component={RenderField} label="Nom"/>
        <FieldArray id="tags" name="tags" label="Mots clés suggérés" 
        help="Vous pouvez sélectionner un ou plusieurs mots clés auxquels les jeux de cette catégorie pourront être associés" 
        objects={tags} component={RenderCheckboxesAsButtons} />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/toyLibrary/categories" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
              disabled={submitting}>
              <i className="fa fa-ban"/> Annuler
            </Link>
            <button className={'btn btn-success ' + cx('marginRight', 'marginBottom')} type="submit"
                    disabled={pristine || invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Valider
            </button>
          </div>
        </div>
      </form>
      <div className={cx('paddingBottom')}>
        <Link to='/dashboard/toyLibrary/categories' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
      
      </div>
  );
};

export default reduxForm({
  form: 'adminToyCategory',  // a unique identifier for this form
  validate: toyCategoryValidation                // <--- validation function given to redux-form
})(ToyCategoryForm);