import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import { Link } from 'react-router';
import RenderSelect from '../components/RenderSelect.jsx';
import RenderUserInputAutoComplete from './RenderUserInputAutoComplete.jsx';
import RenderToyInputAutoComplete from './RenderToyInputAutoComplete.jsx';
import RenderDatePicker from '../components/RenderDatePicker.jsx';
import toyBookingValidation from '../js/validation/toyBookingValidation';
import { matchesProperty } from '../js/utils/arrayUtils';

import classNames from 'classnames/bind';

import styles from '../css/components/toyCreation';

const cx = classNames.bind(styles);

moment.locale('fr');

let ToyBookingForm = (props) => {
  
  const { message, handleSubmit, initialBorrower, initialToy, invalid,
    pristine, submitting, referenceOptions } = props;
      
      
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="toyLibraryId" id="toyLibraryId" component="input" type="hidden"/>

        <Field name="borrowerId" id="borrowerId" component="input" type="hidden"/>
        <Field name="borrower" id="borrower" type="text" size="2-10" initialUser={initialBorrower} formName="toyBooking" inputToUpdate="borrowerId" component={RenderUserInputAutoComplete} label="Emprunteur *" placeholder="Entrez le nom, le prénom ou la raison sociale"/>

        <Field name="toyId" id="toyId" component="input" type="hidden"/>
        <Field name="toy" id="toy" type="text" size="2-10" initialToy={initialToy} formName="toyBooking" inputToUpdate="toyId" component={RenderToyInputAutoComplete} label="Jeu *" placeholder="Entrez le nom ou la référence"/>
        
        <Field name="reference" type="text" size="2-10" component={RenderSelect} label="Référence *" options={referenceOptions} isEmptyChoiceAvailable={true} />
        
        <Field name="start" type="text" size="2-10" component={RenderDatePicker} label="Début"/>
        <Field name="end" type="text" size="2-10" component={RenderDatePicker} label="Fin"/>
        <Field name="returnedDate" type="text" size="2-10" component={RenderDatePicker} label="Retour"/>
        <div className={'form-group '+ cx('paddingTop')}>
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/toyLibrary/bookings" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
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
        <Link to='/dashboard/toyLibrary/bookings' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
    </div>
  );
};

ToyBookingForm = reduxForm({
  form: 'toyBooking',  // a unique identifier for this form
  validate: toyBookingValidation                // <--- validation function given to redux-form
})(ToyBookingForm);

// Decorate with connect to read form values
const selector = formValueSelector('toyBooking'); // <-- same as form name
ToyBookingForm = connect(
  state => {
    // can select values individually
    const toyId = selector(state, 'toyId');
    var toys = state.adminToyLibrary.toys;
    var toy = matchesProperty(toys, ['_id', toyId]);
    const referenceOptions = [];
    if (toy && toy.copies) {
      toy.copies.forEach((copy) => {
        referenceOptions.push(copy.reference);
      });
    }
    return {
      referenceOptions
    };
  }
)(ToyBookingForm);

export default ToyBookingForm;