import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import RenderDateOfBirthField from '../components/RenderDateOfBirthField.jsx';
import personalDataValidation from '../js/personalDataValidation';


const PersonalDataForm = (props) => {
  const { message, handleSubmit, invalid, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="firstname" size="4-8" type="text" component={RenderField} label="Prénom *" placeholder="Prénom"/>
        <Field name="surname" size="4-8" type="text" component={RenderField} label="Nom *" placeholder="Nom"/>
        <RenderDateOfBirthField />
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <button type="submit" className="btn btn-info" disabled={invalid || submitting}>Mettre à jour</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'personalData',  // a unique identifier for this form
  validate: personalDataValidation                // <--- validation function given to redux-form
})(PersonalDataForm);