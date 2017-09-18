import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import moment from 'moment';
import { Link } from 'react-router';
import RenderField from '../components/RenderField.jsx';
import RenderDatePicker from '../components/RenderDatePicker.jsx';
import RenderTimePicker from '../components/RenderTimePicker.jsx';
import toyLibraryValidation from '../js/toyLibraryValidation';

import classNames from 'classnames/bind';

import styles from '../css/components/toyCreation';
import inputStyles from '../css/common/inputs';

const cx = classNames.bind(styles);
const cy = classNames.bind(inputStyles);

const renderOpenings = ({ fields, meta: { error, submitFailed } }) => {
  return (<div>
      <button className="btn btn-info" type="button" onClick={() => fields.push({startTime:moment({hour: 9, minute: 30}), endTime: moment({hour: 12, minute: 30})})}>
        <i className="fa fa-plus"/> Ajouter une date d'ouverture
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    {fields.map((opening, index) =>
      <div key={index} className={cx('opening')}>
        <div className={cx('opening-first-line')}>
        <span>
          Ouverture #{index + 1} 
        </span>
        <button
          className={'btn btn-danger ' + cx('alignRight')}
          type="button"
          title="Supprimer"
          onClick={() => fields.remove(index)}
        ><i className="fa fa-trash"/></button>
        </div>
        <Field name={`${opening}.date`} type="text" size="4-8" component={RenderDatePicker} label="Le"/>
        <Field name={`${opening}.startTime`} type="text" size="4-8" component={RenderTimePicker} label="De"/>
        <Field name={`${opening}.endTime`} type="text" size="4-8" component={RenderTimePicker} label="A"/>
      </div>
    )}
  </div>
  );
};


const ToyLibraryForm = (props) => {
    const { message, handleSubmit, invalid,
      pristine, submitting } = props;
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="toyLibraryId" id="toyLibraryId" component="input" type="hidden"/>
        <Field name="name" type="text" size="4-8" component={RenderField} label="Nom *" placeholder="Nom"/>
        <h3>Adresse</h3>
        <Field name="street" type="text" size="4-8" component={RenderField} label="N° et libellé de la voie *" placeholder="N° et libellé de la voie"/>
        <Field name="postalCode" type="text" size="4-8" component={RenderField} label="Code Postal *" placeholder="Code Postal"/>
        <Field name="city" type="text" size="4-8" component={RenderField} label="Localité *" placeholder="Localité"/>
        <div className="form-group">
          <label htmlFor="active" className="control-label col-sm-4">Actif</label>
          <div className="col-sm-8">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              <Field name="active" id="active" component="input" type="checkbox"/>
              <label htmlFor="active"></label>
            </div>
          </div>
        </div>
        <h3>Ouvertures</h3>
        <FieldArray name="openings" component={renderOpenings} />
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <Link to="/dashboard/toyLibrary/locations" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
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
        <Link to='/dashboard/toyLibrary/locations' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'toyLibrary',  // a unique identifier for this form
  validate: toyLibraryValidation                // <--- validation function given to redux-form
})(ToyLibraryForm);