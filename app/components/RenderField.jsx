import React from 'react';

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <input {...input} type={type} className="form-control" id={input.name} placeholder={label} />
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

RenderField.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default RenderField;