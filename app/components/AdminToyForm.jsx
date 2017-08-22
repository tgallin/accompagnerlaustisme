import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';
import inputStyles from '../css/common/inputs';

const cx = classNames.bind(styles);
const cy = classNames.bind(inputStyles);

let AdminToyForm = (props) => {
    const { message, handleSubmit, invalid,
      pristine, submitting, initialValues } = props;
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="toyId" id="toyId" component="input" type="hidden"/>
        <div className="form-group">
          <label htmlFor="name" className="control-label col-sm-4">Nom</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.name}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="control-label col-sm-4">Contenu</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.content}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="control-label col-sm-4">Description</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.description}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="control-label col-sm-4">Photos</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {
                  initialValues.pictureUrls.map((url) => 
                    <div className={cx('paddingBottom')}><img src={url} /></div>)
            }
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="control-label col-sm-4">Catégories</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.categories}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="control-label col-sm-4">Mots clés</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.tags}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="approved" className="control-label col-sm-4">Approuvé</label>
          <div className="col-sm-8">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              <Field name="approved" id="approved" component="input" type="checkbox"/>
              <label htmlFor="approved"></label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="name" className="control-label col-sm-4">Propriétaire</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            <Link to={'/dashboard/users/' + initialValues.owner.id}>
              {initialValues.owner.profile.firstname + ' ' + initialValues.owner.profile.surname}
            </Link>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <Link to="/dashboard/toyLibrary/toys" className={'btn btn-default ' + cx('marginRight')}
              disabled={submitting}>
              <i className="fa fa-ban"/> Annuler
            </Link>
            <button className={'btn btn-success ' + cx('marginRight')} type="submit"
                    disabled={pristine || invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Valider
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

// Decorate with redux-form
AdminToyForm = reduxForm({
  form: 'adminToy'  // a unique identifier for this form
})(AdminToyForm);

export default AdminToyForm;