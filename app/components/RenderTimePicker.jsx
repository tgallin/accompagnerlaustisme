import React from 'react';
import TimePicker from 'rc-time-picker';
import { labelColClassName, inputColClassName } from '../utils/componentUtils';

const RenderField = ({ input, label, placeholder, help, size, type, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className={'control-label ' + labelColClassName(size)}>{label}</label>
    <div className={inputColClassName(size)}>
      <TimePicker {...input} id={input.name} showSecond={false} />
      {help && <span id="helpBlock" className="help-block">{help}</span>}
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

RenderField.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default RenderField;