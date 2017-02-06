import React from 'react';
import { Field, reduxForm } from 'redux-form';
import registerValidation from '../js/registerValidation';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <input {...input} type={type} className="form-control" id={input.name} placeholder={label} />
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

const RegisterForm = (props) => {
  const { message, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="firstname" type="text" component={renderField} label="Prénom"/>
        <Field name="surname" type="text" component={renderField} label="Nom"/>
        <Field name="age" type="number" component={renderField} label="Age"/>
        <Field name="email" type="email" component={renderField} label="Email"/>
        <Field name="password" type="password" component={renderField} label="Mot de passe"/>
        
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" disabled={submitting}>Créer mon compte</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'register',  // a unique identifier for this form
  validate: registerValidation,                // <--- validation function given to redux-form
})(RegisterForm);