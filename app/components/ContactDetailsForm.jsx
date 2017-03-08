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
        <Field name="mobile" type="text" size="4-8" component={RenderField} label="Portable" placeholder="0601234567"/>
        <Field name="landline" type="text" size="4-8" component={RenderField} label="Fixe" placeholder="0201020304"/>
        <h3>Adresse postale</h3>
        <Field name="street" type="text" size="4-8" component={RenderField} label="Numéro et libellé de la voie" placeholder="3, rue Jeanne d'Arc"/>
        <Field name="postalCode" type="text" size="4-8" component={RenderField} label="Code postal" placeholder="45000"/>
        <Field name="city" type="text" size="4-8" component={RenderField} label="Ville" placeholder="Orléans"/>
        <Field name="complement1" type="text" size="4-8" component={RenderField} label="Complément 1" help="Sert à identifier votre logement à l'intérieur d'un immeuble" placeholder="Appartement 12 Escalier C"/>
        <Field name="complement2" type="text" size="4-8" component={RenderField} label="Complément 2" help="Sert à identifier l'extérieur du bâtiment : entrée, tour, bâtiment, immeuble, résidence" placeholder="Résidence Les Tilleuls"/>
        <Field name="complement3" type="text" size="4-8" component={RenderField} label="Complément 3" help="Lieu dit ou service particulier de distribution : Poste restante, boite postale, ..." placeholder="boite postale 123AB"/>
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