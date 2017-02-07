import React from 'react';
import { Field, reduxForm } from 'redux-form';
import contactValidation from '../js/contactValidation';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <input {...input} type={type} className="form-control" id={input.name} placeholder={label} />
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

const renderTextarea = ({ input, label, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <textarea {...input} className="form-control" id={input.name} placeholder={label} />
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

const ContactForm = (props) => {
  const { message, authenticated, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
      {!authenticated ?
        (<div>
          <Field name="firstname" type="text" component={renderField} label="Prénom"/>
          <Field name="surname" type="text" component={renderField} label="Nom"/>
          <Field name="email" type="email" component={renderField} label="Email"/>
          </div>) : ''
      }

        <Field name="body" component={renderTextarea} label="Message"/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" disabled={submitting}>Envoyer</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'contact',  // a unique identifier for this form
  validate: contactValidation,                // <--- validation function given to redux-form
})(ContactForm);