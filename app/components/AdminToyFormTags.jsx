import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import toyValidation from '../js/validation/toyValidation';
import RenderCheckboxesAsButtons from '../components/RenderCheckboxesAsButtons.jsx';
import { matchesProperty, shallowClone } from '../js/utils/arrayUtils';

import classNames from 'classnames/bind';

import styles from '../css/components/toyCreation';

const cx = classNames.bind(styles);

let AdminToyFormTags = (props) => {
    const { message, handleSubmit, previousPage, invalid,
      submitting, tags, suggestedTags } = props;
     
    const getTags = (allTags, sugggestedTags) => {
      if (sugggestedTags && sugggestedTags.length > 0) {
        var tags = [];
        var allTagsCopy = shallowClone(allTags);
        if (allTagsCopy) {
          allTagsCopy.forEach((tag) => {
            var suggestedTag = matchesProperty(suggestedTags, ['_id', tag._id]);
            if (suggestedTag !== undefined && suggestedTag !== null) {
              tag.hide = false;
              tag.useNewValue = false;
              tag.newValue = null;
            }
            else {
              tag.hide = true;
              tag.useNewValue = true;
              tag.newValue = '';
            }
            tags.push(tag);
          });
        }
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
            <Link to="/dashboard/toyLibrary/toys" className={'btn btn-default ' + cx('marginRight', 'marginBottom')}
              disabled={submitting}>
              <i className="fa fa-ban"/><span className={cx('hide-btn-label')}> Annuler</span>
            </Link>
            <button type="button" className={'btn btn-default active ' + cx('marginRight', 'marginBottom')} onClick={previousPage}>
              <i className={'fa fa-chevron-left'}/><span className={cx('hide-btn-label')}> Catégories</span>
            </button>
            <button className={'btn btn-info ' + cx('marginRight', 'marginBottom')} type="submit"
                    disabled={invalid || submitting}>
              Administration <i className={'fa fa-chevron-right'}/>
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
  validate: toyValidation,                // <--- validation function given to redux-form
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AdminToyFormTags);