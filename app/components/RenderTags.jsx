import React from 'react';
import { Field } from 'redux-form';
import RenderTag from '../components/RenderTag.jsx';

const RenderTags = ({ tags, checkedTags, label, help }) => (
  <div>
    <div className="form-group">
      <label htmlFor="tags" className="control-label col-sm-2">{label}</label>
      <div className="col-sm-10">
         {
            tags.map((tag) => 
            <Field name={'tag_' + tag._id} tag={tag.name} component={RenderTag} />
              )
          }
          
      </div>
    </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          {help && <div id="helpBlock" className="help-block">{help}</div>}
        </div>
      </div>
  </div>
);

RenderTags.propTypes = {
  tags: React.PropTypes.array.isRequired
};

export default RenderTags;