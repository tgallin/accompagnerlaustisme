import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import forgotPasswordValidation from '../js/forgotPasswordValidation';

const ForgotPasswordForm = (props) => {
  const { message, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="email" type="email" component={RenderField} label="Email"/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-info" disabled={submitting}>Envoyer</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'forgotPassword',  // a unique identifier for this form
  validate: forgotPasswordValidation                // <--- validation function given to redux-form
})(ForgotPasswordForm);