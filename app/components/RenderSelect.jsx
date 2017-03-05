import React from 'react';

const RenderSelect = ({ input, label, options, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <select {...input} className="form-control" id={input.name}>
            <option value=""></option>
            {options.map(option =>
              <option value={option} key={option}>{option}</option>)
            }
      </select>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

RenderSelect.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default RenderSelect;