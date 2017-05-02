import React from 'react';

const RenderTextarea = ({ input, label, placeholder, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <textarea {...input} className="form-control" id={input.name} rows="10" placeholder={placeholder || label} />
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

RenderTextarea.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default RenderTextarea;