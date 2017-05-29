import React from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames/bind';
import styles from '../css/components/dateField';
import { padStart } from '../utils/stringUtils';


const cx = classNames.bind(styles);


var days = [];
var months = [];
var years = [];
var currentYear = new Date(Date.now()).getFullYear();
for (var i=1;i<=31;i++) {
  days.push(padStart(i.toString(), "00"));
}
for (var i=1;i<=12;i++) {
  months.push(padStart(i.toString(), "00"));
}
for (var i=(currentYear-100);i<=(currentYear-18);i++) {
  years.push(i);
}

const RenderDateOfBirthField = () => (
  <div className={'form-group'}>
    <label htmlFor="dateOfBirthDay" className="col-sm-4 control-label">Date de naissance</label>
    <div className="col-sm-8">
      <Field name="dateOfBirthDay" className={cx('form-control-select')} id="dateOfBirthDay" component="select">
          <option value=""></option>
          {days.map(option =>
            <option value={option} key={option}>{option}</option>)
          }
      </Field>
      <Field name="dateOfBirthMonth" className={cx('form-control-select')} id="dateOfBirthMonth" component="select">
          <option value=""></option>
          {months.map(option =>
            <option value={option} key={option}>{option}</option>)
          }
      </Field>
      <Field name="dateOfBirthYear" className={cx('form-control-select')} id="dateOfBirthYear" component="select">
          <option value=""></option>
          {years.map(option =>
            <option value={option} key={option}>{option}</option>)
          }
      </Field>
    </div>
  </div>
);

export default RenderDateOfBirthField;