import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import classNames from 'classnames/bind';

import styles from '../css/components/user';

const cx = classNames.bind(styles);

const renderField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <input {...input} type={type} className="form-control" id={input.name} />
      {touched && error && <div className="text-danger">{error}</div>}
  </div>
);

function createAddress(address) {
  if (address) {
    var lines = [];
    if (address.complement1) {
      lines.push(address.complement1);
    }
    if (address.complement2) {
      lines.push(address.complement2);
    }
    if (address.street) {
      lines.push(address.street);
    }
    if (address.complement3) {
      lines.push(address.postalCode);
    }
    if (address.postalCode) {
      lines.push(address.postalCode);
    }
    if (address.city) {
      lines.push(address.city);
    }
    return { __html: lines.join('<br/>') };
  } else {
      return { __html: 'Non communiquée' };
  }
};

const UserForm = (props) => {
    const { message, handleSubmit, invalid,
      pristine, submitting, initialValues } = props;
  return (
      <div>
      <Link to='dashboard/users'>Retour à la liste</Link>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="userId" id="userId" component="input" type="hidden"/>
        <div className="form-group">
          <label htmlFor="surname" className="control-label col-sm-4">Nom</label>
          <div id="surname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.surname}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="surname" className="control-label col-sm-4">Prénom</label>
          <div id="firstname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.firstname}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="admin" className="control-label col-sm-4">Admin</label>
          <div className={'col-sm-8 ' + cx('control-checkbox')}>
            <Field name="admin" id="admin" component="input" type="checkbox"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="member" className="control-label col-sm-4">Membre</label>
          <div className={'col-sm-8 ' + cx('control-checkbox')}>
            <Field name="member" id="member" component="input" type="checkbox"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <button className={'btn btn-success ' + cx('paddingRight')} type="submit"
                    disabled={pristine || invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Sauvegarder
            </button>
            <Link to="dashboard/users" className="btn btn-warning"
              disabled={submitting}>
              <i className="fa fa-ban"/> Annuler
            </Link>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-4"><h3>Coordonnées</h3></label>
        </div>
        <div className="form-group">
          <label htmlFor="surname" className="control-label col-sm-4">Email</label>
          <div id="firstname" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.email}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="surname" className="control-label col-sm-4">Téléphone portable</label>
          <div id="address" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.mobile ? initialValues.mobile : <span>Non communiqué</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="surname" className="control-label col-sm-4">Téléphone fixe</label>
          <div id="address" className={'col-sm-8 ' + cx('control-readvalue')}>
            {initialValues.landline ? initialValues.landline : <span>Non communiqué</span>}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="surname" className="control-label col-sm-4">Adresse postale</label>
          <div id="address" className={'col-sm-8 ' + cx('control-readvalue')}>
            <div dangerouslySetInnerHTML={createAddress(initialValues.address)} />
          </div>
        </div>
      </form>
      </div>
  );
};

export default reduxForm({
  form: 'adminuser'
})(UserForm);