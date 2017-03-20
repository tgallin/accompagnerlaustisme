import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField.jsx';
import contactDetailsValidation from '../js/contactDetailsValidation';


const ContactDetailsForm = (props) => {
  const { message, handleSubmit, submitting } = props;
  return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        <h3>Téléphones</h3>
        <Field name="mobile" type="text" size="4-8" component={RenderField} label="Portable" help="" placeholder="ex : 0601234567"/>
        <Field name="landline" type="text" size="4-8" component={RenderField} label="Fixe" help="" placeholder="ex : 0201020304"/>
        <h3>Adresse postale</h3>
        <Field name="street" type="text" size="4-8" component={RenderField} label="N° et libellé de la voie *" placeholder=""/>
        <Field name="postalCode" type="text" size="4-8" component={RenderField} label="Code Postal *" placeholder=""/>
        <Field name="city" type="text" size="4-8" component={RenderField} label="Localité *" placeholder=""/>
        <Field name="complement1" type="text" size="4-8" component={RenderField} label="Appartement, Étage" help="Sert à identifier votre logement à l'intérieur d'un immeuble" placeholder=""/>
        <Field name="complement2" type="text" size="4-8" component={RenderField} label="Bâtiment, Immeuble" help="Sert à identifier l'extérieur du bâtiment : entrée, tour, bâtiment, immeuble, résidence" placeholder=""/>
        <Field name="complement3" type="text" size="4-8" component={RenderField} label="Lieu-dit ou BP" help="Lieu dit ou service particulier de distribution : Poste restante, boite postale, ..." placeholder=""/>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-8">
            <button type="submit" className="btn btn-info" disabled={submitting}>Mettre à jour</button>
          </div>
        </div>
      </form>
  );
};

export default reduxForm({
  form: 'contactDetails',  // a unique identifier for this form
  validate: contactDetailsValidation                // <--- validation function given to redux-form
})(ContactDetailsForm);