import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import toyValidation from '../js/toyValidation';
import RenderCheckboxesAsButtons from '../components/RenderCheckboxesAsButtons.jsx';
import _ from 'lodash';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

let ToyFormTags = (props) => {
    const { message, handleSubmit, previousPage, invalid,
      submitting, tags, suggestedTags } = props;
     
     
    const getTags = (allTags, sugggestedTags) => {
      if (sugggestedTags && sugggestedTags.length > 0) {
        var tags = [];
        var allTagsCopy = _.clone(allTags);
        allTagsCopy.forEach((tag) => {
          var suggestedTag = _.find(suggestedTags, ['_id', tag._id]);
          if (!_.isNil(suggestedTag)) {
            tag.hide = false;
            tag.useNewValue = false;
            tag.newValue = null;
          }
          else {
            tag.hide = true;
            tag.useNewValue = true;
            tag.newValue = false;
          }
          tags.push(tag);
        });
        return tags;
      }
      else {
        return allTags;
      }
    };
      
  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
      {message && <div className="alert alert-danger" role="alert">{message}</div>}
        
        <FieldArray id="tags" name="tags" label="Mots clés" 
        help="Vous pouvez sélectionner un ou plusieurs mots clés" objects={getTags(tags,suggestedTags)} component={RenderCheckboxesAsButtons} />
        
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <Link to="/dashboard/mytoys" className={'btn btn-default ' + cx('marginRight')}
              disabled={submitting}>
              <i className="fa fa-ban"/> Annuler
            </Link>
            <button type="button" className={'btn btn-default active ' + cx('marginRight')} onClick={previousPage}>
              <i className={'fa fa-chevron-left'}/> Catégories
            </button>
            <button className={'btn btn-success ' + cx('marginRight')} type="submit"
                    disabled={invalid || submitting}>
              <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> Sauvegarder
            </button>
          </div>
        </div>
      </form>
      <div className={cx('paddingBottom')}>
        <Link to='/dashboard/mytoys' ><i className="fa fa-angle-double-left"/><span className={cx('paddingLeft')}>Retour à la liste</span></Link>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'myToy',  // a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: toyValidation                // <--- validation function given to redux-form
})(ToyFormTags);