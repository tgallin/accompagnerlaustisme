import React from 'react';
import { Field } from 'redux-form';
import RenderCheckboxAsButton from '../components/RenderCheckboxAsButton.jsx';

const RenderCheckboxesAsButtons = ({input, objects, id, label, help, meta: { error } }) => (
  <div>
    <div className="form-group">
      <label htmlFor={id} className="control-label col-sm-2">{label}</label>
      <div className="col-sm-10">
          {objects && objects.length > 0 &&
            objects.map((obj, i) => (
            <Field key={i} name={`${id}[${i}].${obj._id}`} val={obj.name} hide={obj.hide} useNewValue={obj.useNewValue} newValue={obj.newValue} component={RenderCheckboxAsButton} />
          ))
          }
          {(!objects || objects.length === 0) &&
            <div>Aucune valeur disponible</div>
          }
      </div>
    </div>
    <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
        {error ? <div className="text-danger">{error}</div> :
          help && <div id="helpBlock" className="help-block">{help}</div>
        }
      </div>
    </div>
  </div>
);

RenderCheckboxesAsButtons.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  objects: React.PropTypes.array.isRequired,
  help: React.PropTypes.string
};

export default RenderCheckboxesAsButtons;