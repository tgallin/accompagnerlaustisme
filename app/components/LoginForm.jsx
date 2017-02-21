import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import loginValidation from '../js/loginValidation';

const LoginForm = (props) => {
  const { message, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="email" type="email" component={RenderField} label="Email"/>
        <Field name="password" type="password" component={RenderField} label="Mot de passe"/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-info" disabled={submitting}>Me connecter</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'login',  // a unique identifier for this form
  validate: loginValidation,                // <--- validation function given to redux-form
  destroyOnUnmount: false
})(LoginForm);