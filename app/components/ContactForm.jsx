import React from 'react';
import { Field, reduxForm } from 'redux-form';
import contactValidation from '../js/contactValidation';
import Captcha from '../components/Captcha.jsx';
import RenderField from '../components/RenderField.jsx';
import RenderTextarea from '../components/RenderTextarea.jsx';

const ContactForm = (props) => {
  const { message, authenticated, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
      {!authenticated ?
        (<div>
          <Field name="firstname" type="text" component={RenderField} label="Prénom"/>
          <Field name="surname" type="text" component={RenderField} label="Nom"/>
          <Field name="email" type="email" component={RenderField} label="Email"/>
          </div>) : ''
      }

        <Field name="subject" component={RenderField} label="Sujet"/>
        <Field name="message" component={RenderTextarea} label="Message"/>
        
      {!authenticated ? (<Field name='captcharesponse' component={Captcha}/>) : ''}
        
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
  destroyOnUnmount: false
})(ContactForm);