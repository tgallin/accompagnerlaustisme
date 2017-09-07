import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createAddress } from '../utils/componentUtils';
import RenderOwnerInputAutoComplete from './RenderOwnerInputAutoComplete.jsx';
import adminToyValidation from '../js/adminToyValidation';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';
import inputStyles from '../css/common/inputs';

const cx = classNames.bind(styles);
const cy = classNames.bind(inputStyles);

let AdminToyFormAdmin = (props) => {
    const { message, handleSubmit, previousPage, invalid,
      submitting, toyLibraries, initialOwner } = props;
      
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
      
        <div className="form-group">
          <label htmlFor="approved" className="control-label col-sm-2">Approuvé</label>
          <div className="col-sm-10">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              <Field name="approved" id="approved" component="input" type="checkbox"/>
              <label htmlFor="approved"></label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="online" className="control-label col-sm-2">En ligne</label>
          <div className="col-sm-10">
            <div className={cx('control-checkbox') + ' ' + cy('slide')}>
              <Field name="online" id="online" component="input" type="checkbox"/>
              <label htmlFor="online"></label>
            </div>
          </div>
        </div>
        
        <div>
        <Field name="ownerId" id="ownerId" component="input" type="hidden"/>
        <Field name="owner" id="owner" type="text" size="2-10" initialOwner={initialOwner} component={RenderOwnerInputAutoComplete} label="Propriétaire *" placeholder="Entrez le nom, le prénom ou la raison sociale"/>
        
        <div className="form-group">
          <label htmlFor="toyLibrary" className="control-label col-sm-2">Lieu</label>
          <div className="col-sm-10">
            <div className={cx('address')}>
              <div className={cx('inputAddress')}><Field name="toyLibraryId" component="input" type="radio" value="" /></div>
              <div className={cx('labelAddress')}>Chez le propriétaire</div>
            </div>
          {
            toyLibraries.map((toyLibrary) => (
              <div className={cx('address')}>
                <div className={cx('inputAddress')}><Field name="toyLibraryId" component="input" type="radio" value={toyLibrary._id} /></div>
                <div className={cx('labelAddress')} key={toyLibrary._id} dangerouslySetInnerHTML={{__html: (toyLibrary.name + '<br/>' + createAddress(toyLibrary.address))}} />
              </div>
              )
            )
          }
          </div>
        </div>
        </div>

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

export default reduxForm({
  form: 'adminToy',  // a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: adminToyValidation, // <--- validation function given to redux-form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AdminToyFormAdmin);