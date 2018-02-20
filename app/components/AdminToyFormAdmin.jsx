import React from 'react';
import { connect } from 'react-redux';
import { Field, change, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import { Link } from 'react-router';
import { createAddress } from '../js/utils/componentUtils';
import RenderUserInputAutoComplete from './RenderUserInputAutoComplete.jsx';
import RenderTextarea from './RenderTextarea.jsx';
import RenderField from './RenderField.jsx';
import adminToyValidation from '../js/validation/adminToyValidation';

moment.locale('fr');

import classNames from 'classnames/bind';

import styles from '../css/components/toyCreation';
import inputStyles from '../css/common/inputs';

const cx = classNames.bind(styles);
const cy = classNames.bind(inputStyles);


const renderComments = ({ fields, initialComments, meta: { error, submitFailed } }) => {
  return (<div>
      <button className="btn btn-info" type="button" onClick={() => {fields.push({date: moment().format('DD/MM/YYYY')}); initialComments.push({date: moment().format('DD/MM/YYYY')});}}>
        <i className="fa fa-plus"/> Ajouter un commentaire
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    {fields.map((comment, index) => 
      <div key={index} className={cx('comment')}>
        <div className={cx('comment-first-line')}>
        <span>
          Commentaire #{index + 1}
        </span>
        {initialComments.length > index && initialComments[index].date &&
          <span> ajouté le {moment(initialComments[index].date, 'DD/MM/YYYY').format('dddd DD MMMM YYYY')}</span>
        }
        <button
          className={'btn btn-danger ' + cx('alignRight')}
          type="button"
          title="Supprimer"
          onClick={() => {fields.remove(index); initialComments.splice(index, 1);}}
        ><i className="fa fa-trash"/></button>
        </div>
        <Field name={`${comment}.date`} id={`${comment}.date`} component="input" type="hidden"/>
        <Field name={`${comment}.comment`} component={RenderTextarea} label="Commentaire" placeholder="ex: il manque une pièce, ..."/>
      </div>
    )}
  </div>
  );
};


const renderCopies = ({ fields, toyLibraries, initialCopies, meta: { error, submitFailed } }) => {
  return (<div>
      <button className="btn btn-info" type="button" onClick={() => {fields.push({}); initialCopies.push({});}}>
        <i className="fa fa-plus"/> Ajouter un exemplaire
      </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
    {fields.map((copy, index) => (
      <div key={'copy' + index} className={cx('copy')}>
        <div className={cx('copy-first-line')}>
          <span>
            Exemplaire #{index + 1}
          </span>
          {initialCopies.length > index && initialCopies[index].currentBookingId &&
            <span className="text-danger"> - Cet exemplaire est actuellement emprunté, il ne peut donc pas être supprimé.</span>
          }
          {fields.length > 1 && (initialCopies.length <= index || !initialCopies[index].currentBookingId) &&
          <button
            className={'btn btn-danger ' + cx('alignRight')}
            type="button"
            title="Supprimer"
            onClick={() => {fields.remove(index); initialCopies.splice(index, 1);}}>
              <i className="fa fa-trash"/>
          </button>
          }
        </div>
        <Field name={`${copy}.currentBookingId`} id={`${copy}.currentBookingId`} component="input" type="hidden"/>
        <Field name={`${copy}.reference`} type="text" size="2-10" component={RenderField} readOnly="true" label="Référence" placeholder="Ref. calculée automatiquement"/>
        <div className="form-group">
          <label htmlFor="toyLibrary" className="control-label col-sm-2">Lieu</label>
          <div className="col-sm-10">
            <div className={cx('address')}>
              <div className={cx('inputAddress')}><Field name={`${copy}.toyLibraryId`} component="input" type="radio" value="" /></div>
              <div className={cx('labelAddress')}>Chez le propriétaire</div>
            </div>
            {
              toyLibraries.map((toyLibrary, index) => (
                <div key={'toyLibrary' + index} className={cx('address')}>
                  <div className={cx('inputAddress')}><Field name={`${copy}.toyLibraryId`} component="input" type="radio" value={toyLibrary._id} /></div>
                  <div className={cx('labelAddress')} key={toyLibrary._id} dangerouslySetInnerHTML={{__html: (toyLibrary.name + '<br/>' + createAddress(toyLibrary.address))}} />
                </div>
                )
              )
            }
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

let AdminToyFormAdmin = (props) => {
    const { forceOffline, message, handleSubmit, previousPage, invalid,
      submitting, toyLibraries, initialOwner, initialCopies, initialComments, isApproved } = props;
      
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
      
        <Field name="productCode" type="text" size="2-10" component={RenderField} label="Code produit" placeholder="Identifie un jeu (code barre), un livre (ISBN), ..."/>
        
        <div className="form-group">
          <label htmlFor="approved" className="control-label col-sm-2">Approuvé</label>
          <div className="col-sm-10">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              <Field name="approved" id="approved" component="input" type="checkbox"
              onChange={(event, value) => {
                if (!value) 
                {
                  forceOffline();
                }
              }}/>
              <label htmlFor="approved"></label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="online" className="control-label col-sm-2">En ligne</label>
          <div className="col-sm-10">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              {isApproved && <Field name="online" id="online" component="input" type="checkbox" />}
              {!isApproved && <Field name="online" id="online" readOnly={true} disabled={true} value={false} checked={false} component="input" type="checkbox"/>}
              <label htmlFor="online"></label>
            </div>
          </div>
        </div>
        
        <Field name="ownerId" id="ownerId" component="input" type="hidden"/>
        <Field name="owner" id="owner" type="text" size="2-10" initialUser={initialOwner} formName="adminToy" inputToUpdate="ownerId" component={RenderUserInputAutoComplete} label="Propriétaire *" placeholder="Entrez le nom, le prénom ou la raison sociale"/>
        
        <h3>Exemplaires</h3>
        <FieldArray name="copies" toyLibraries={toyLibraries} initialCopies={initialCopies} component={renderCopies} />

        <h3>Commentaires</h3>
        <FieldArray name="comments" initialComments={initialComments} component={renderComments} />

        <div className={'form-group '+ cx('paddingTop')}>
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/toyLibrary/toys" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
              disabled={submitting}>
              <i className="fa fa-ban"/><span className={cx('hide-btn-label')}> Annuler</span>
            </Link>
            <button type="button" className={'btn btn-default active ' + cx('marginRight', 'marginBottom')} onClick={previousPage}>
              <i className={'fa fa-chevron-left'}/><span className={cx('hide-btn-label')}> Mots clés</span>
            </button>
            <button className={'btn btn-success ' + cx('marginRight', 'marginBottom')} type="submit"
                    disabled={invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Valider
            </button>
          </div>
        </div>
      </form>
      <div className={cx('paddingBottom')}>
        <Link to='/dashboard/toyLibrary/toys' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
    </div>
  );
};

AdminToyFormAdmin = reduxForm({
  form: 'adminToy',  // a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: adminToyValidation, // <--- validation function given to redux-form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AdminToyFormAdmin);

// Decorate with connect to read form values
const selector = formValueSelector('adminToy'); // <-- same as form name
AdminToyFormAdmin = connect(
  state => {
    // can select values individually
    const isApproved = selector(state, 'approved');
    return {
      isApproved
    };
  },{
  forceOffline: () => change("adminToy", "online", false)
}
)(AdminToyFormAdmin);

export default AdminToyFormAdmin;