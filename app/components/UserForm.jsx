import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router';

import RenderDatePicker from '../components/RenderDatePicker.jsx';
import classNames from 'classnames/bind';

import styles from '../css/components/user';
import inputStyles from '../css/common/inputs';

const cx = classNames.bind(styles);
const cy = classNames.bind(inputStyles);

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

let UserForm = (props) => {
    const { message, isMember, handleSubmit, invalid,
      pristine, submitting, initialValues } = props;
  return (
      <div>
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
           <div className="col-sm-8">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              <Field name="admin" id="admin" component="input" type="checkbox"/>
              <label htmlFor="admin"></label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="member" className="control-label col-sm-4">Membre</label>
          <div className="col-sm-8">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              <Field name="member" id="member" component="input" type="checkbox"/>
              <label htmlFor="member"></label>
            </div>
          </div>
        </div>
        {isMember && 
        <div>
        <Field name="memberFrom" type="text" size="4-8" component={RenderDatePicker} label="Du"/>
        <Field name="memberTo" type="text" size="4-8" component={RenderDatePicker} label="Au"/>
        </div>
        }
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <Link to="dashboard/users" className={'btn btn-default ' + cx('marginRight')}
              disabled={submitting}>
              <i className="fa fa-ban"/> Annuler
            </Link>
            <button className={'btn btn-success ' + cx('marginRight')} type="submit"
                    disabled={pristine || invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Valider
            </button>
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
      <div className={cx('paddingBottom')}>
        <Link to='dashboard/users' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
      
      </div>
  );
};

// Decorate with redux-form
UserForm = reduxForm({
  form: 'adminuser'  // a unique identifier for this form
})(UserForm);

// Decorate with connect to read form values
const selector = formValueSelector('adminuser'); // <-- same as form name
UserForm = connect(
  state => {
    // can select values individually
    const isMember = selector(state, 'member');
    return {
      isMember
    };
  }
)(UserForm);

export default UserForm;