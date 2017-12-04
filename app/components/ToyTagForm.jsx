import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import toyTagValidation from '../js/validation/toyTagValidation';
import RenderField from '../components/RenderField.jsx';

import classNames from 'classnames/bind';

import styles from '../css/components/toyCreation';

const cx = classNames.bind(styles);

let ToyTagForm = (props) => {
    const { message, handleSubmit, invalid,
      pristine, submitting } = props;
  return (
      <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="toyTagId" id="toyTagId" component="input" type="hidden"/>
        <Field name="name" type="text" size="2-10" component={RenderField} label="Nom *" placeholder="Nom"/>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/toyLibrary/tags" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
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
        <Link to='/dashboard/toyLibrary/tags' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
      
      </div>
  );
};

export default reduxForm({
  form: 'adminToyTag',  // a unique identifier for this form
  validate: toyTagValidation                // <--- validation function given to redux-form
})(ToyTagForm);