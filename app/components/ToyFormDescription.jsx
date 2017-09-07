import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import toyValidation from '../js/toyValidation';
import RenderField from '../components/RenderField.jsx';
import RenderTextarea from '../components/RenderTextarea.jsx';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

let ToyFormDescription = (props) => {
    const { message, handleSubmit, invalid,
      submitting } = props;
      
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="toyId" id="toyId" component="input" type="hidden"/>
        <Field name="name" type="text" size="2-10" component={RenderField} label="Nom *" placeholder="Nom"/>
        <Field name="content" component={RenderTextarea} label="Contenu" placeholder="ex: 1 boite avec 2 dés, ..."/>
        <Field name="description" component={RenderTextarea} label="Description" placeholder="ex: Permet à l'enfant d'apprendre à compter..."/>
        
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/mytoys" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
              disabled={submitting}>
              <i className="fa fa-ban"/> Annuler
            </Link>
            <button className={'btn btn-info ' + cx('marginRight', 'marginBottom')} type="submit"
                    disabled={invalid || submitting}>
               Photos <i className={'fa fa-chevron-right'}/>
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
  validate: toyValidation,                // <--- validation function given to redux-form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(ToyFormDescription);