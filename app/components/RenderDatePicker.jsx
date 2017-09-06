import React from 'react';
import { DateField, MonthView } from 'react-date-picker';
import { labelColClassName, inputColClassName } from '../utils/componentUtils';

const RenderField = ({ input, label, placeholder, help, size, type, meta: { touched, error } }) => (
  <div className={'form-group' + (error && touched ? ' has-error' : '')}>
    <label htmlFor={input.name} className={'control-label ' + labelColClassName(size)}>{label}</label>
    <div className={inputColClassName(size)}>
      <DateField
          {...input} id={input.name}
          forceValidDate={false}
          dateFormat="DD/MM/YYYY"
          updateOnDateClick={true}
          collapseOnDateClick={true}>
        <MonthView
          weekNumbers={true}
          locale="fr"
          weekStartDay={1}
          footer={false}
        />
      </DateField>
      {help && <span id="helpBlock" className="help-block">{help}</span>}
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
);

RenderField.propTypes = {
  input: React.PropTypes.object.isRequired
};

export default RenderField;