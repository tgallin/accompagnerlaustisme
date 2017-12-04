import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import changeEmailValidation from '../js/validation/changeEmailValidation';


const ChangeEmailForm = (props) => {
  const { message, handleSubmit, invalid, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="email" type="email" size="4-8" component={RenderField} label="Email *" placeholder="Email"/>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <button type="submit" className="btn btn-info" disabled={invalid || submitting}>Mettre à jour</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'changeEmailForm',  // a unique identifier for this form
  validate: changeEmailValidation                // <--- validation function given to redux-form
})(ChangeEmailForm);