import React from 'react';
import { labelColClassName, inputColClassName } from '../utils/componentUtils';

const RenderField = ({ input, label, placeholder, help, size, type, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className={'control-label ' + labelColClassName(size)}>{label}</label>
    <div className={inputColClassName(size)}>
      <input {...input} type={type} className="form-control" id={input.name} placeholder={placeholder || label} />
      {help && <span id="helpBlock" className="help-block">{help}</span>}
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

RenderField.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default RenderField;