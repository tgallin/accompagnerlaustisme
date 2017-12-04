import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import Captcha from '../components/Captcha.jsx';
import registerValidation from '../js/validation/registerValidation';


const RegisterForm = (props) => {
  const { message, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <Field name="firstname" type="text" component={RenderField} label="Prénom"/>
        <Field name="surname" type="text" component={RenderField} label="Nom"/>
        <Field name="email" type="email" component={RenderField} label="Email"/>
        <Field name="password" type="password" component={RenderField} label="Mot de passe"/>
        <Field name="confirmPassword" type="password" component={RenderField} label="Confirmez votre mot de passe"/>
        <Field name='captcharesponse' component={Captcha}/>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-info" disabled={submitting}>Créer mon compte</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'register',  // a unique identifier for this form
  validate: registerValidation                // <--- validation function given to redux-form
})(RegisterForm);