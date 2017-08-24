import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router';

import RenderDatePicker from './RenderDatePicker.jsx';
import RenderField from './RenderField.jsx';
import classNames from 'classnames/bind';

import styles from '../css/components/user';
import inputStyles from '../css/common/inputs';

const cx = classNames.bind(styles);
const cy = classNames.bind(inputStyles);

let UserForm = (props) => {
    const { message, isMember, legalStatus, handleSubmit, invalid,
      pristine, submitting } = props;
  return (
      <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="userId" id="userId" component="input" type="hidden"/>
        <div className="form-group">
          <label htmlFor="legalStatus" className="control-label col-sm-4">Nature</label>
          <div className="col-sm-8">
            <label className={'control-label ' + cx('marginRight')}>
              <Field
                name="legalStatus"
                component="input"
                type="radio"
                value="P"
              />{' '}
              Personne physique
            </label>
            <label className="control-label">
              <Field
                name="legalStatus"
                component="input"
                type="radio"
                value="M"
              />{' '}
              Personne morale
            </label>
          </div>
        </div>

        {legalStatus==='P' && 
          <div>
            <Field name="firstname" size="4-8" type="text" component={RenderField} label="Prénom"/>
            <Field name="surname" size="4-8" type="text" component={RenderField} label="Nom"/>
          </div>
        }
        {legalStatus==='M' && 
          <div>
            <Field name="entityName" size="4-8" type="text" component={RenderField} label="Raison sociale"/>
          </div>
        }

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
          <label className="control-label col-sm-4"><h3>Coordonnées</h3></label>
        </div>
        <Field name="email" type="text" size="4-8" component={RenderField} label="Email" help=""/>
        <div className="form-group">
          <label className="control-label col-sm-4"><h4>Téléphones</h4></label>
        </div>
        <Field name="mobile" type="text" size="4-8" component={RenderField} label="Portable" help=""/>
        <Field name="landline" type="text" size="4-8" component={RenderField} label="Fixe" help=""/>
        <div className="form-group">
          <label className="control-label col-sm-4"><h4>Adresse postale</h4></label>
        </div>
        <Field name="street" type="text" size="4-8" component={RenderField} label="N° et libellé de la voie" placeholder=""/>
        <Field name="postalCode" type="text" size="4-8" component={RenderField} label="Code Postal" placeholder=""/>
        <Field name="city" type="text" size="4-8" component={RenderField} label="Localité" placeholder=""/>
        <Field name="complement1" type="text" size="4-8" component={RenderField} label="Appartement, Étage" help="Sert à identifier votre logement à l'intérieur d'un immeuble" placeholder="ex : Appartement 12 Escalier C"/>
        <Field name="complement2" type="text" size="4-8" component={RenderField} label="Bâtiment, Immeuble" help="Sert à identifier l'extérieur du bâtiment : entrée, tour, bâtiment, immeuble, résidence" placeholder="ex : Résidence Les Tilleuls"/>
        <Field name="complement3" type="text" size="4-8" component={RenderField} label="Lieu-dit ou BP" help="Lieu dit ou service particulier de distribution : Poste restante, boite postale, ..." placeholder="ex : boite postale 123AB"/>
        
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <Link to="/dashboard/users" className={'btn btn-default ' + cx('marginRight')}
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
        <Link to='/dashboard/users' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
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
    const legalStatus = selector(state, 'legalStatus');
    return {
      isMember,
      legalStatus
    };
  }
)(UserForm);

export default UserForm;