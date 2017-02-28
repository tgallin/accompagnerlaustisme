import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import accountSettingsValidation from '../js/accountSettingsValidation';


const AccountSettingsForm = (props) => {
  const { message, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="firstname" type="text" component={RenderField} label="Prénom"/>
        <Field name="surname" type="text" component={RenderField} label="Nom"/>
        <Field name="email" type="email" component={RenderField} label="Email"/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-info" disabled={submitting}>Mettre à jour</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'accountSettings',  // a unique identifier for this form
  validate: accountSettingsValidation                // <--- validation function given to redux-form
})(AccountSettingsForm);