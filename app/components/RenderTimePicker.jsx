import React from 'react';
import TimePicker from 'rc-time-picker';

function labelColClassName(size) {
  switch (size) {
    case "2-10": return "col-sm-2";
    case "3-9": return "col-sm-3";
    case "4-8": return "col-sm-4";
    case "5-7": return "col-sm-5";
    case "6-6": return "col-sm-6";
    default : return "col-sm-2";
  }
}

function inputColClassName(size) {
  switch (size) {
    case "2-10": return "col-sm-10";
    case "3-9": return "col-sm-9";
    case "4-8": return "col-sm-8";
    case "5-7": return "col-sm-7";
    case "6-6": return "col-sm-6";
    default : return "col-sm-10";
  }
}

const RenderField = ({ input, label, placeholder, defaultTime, help, size, type, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className={'control-label ' + labelColClassName(size)}>{label}</label>
    <div className={inputColClassName(size)}>
      <TimePicker {...input} id={input.name} defaultValue={defaultTime} showSecond={false} />
      {help && <span id="helpBlock" className="help-block">{help}</span>}
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

RenderField.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default RenderField;