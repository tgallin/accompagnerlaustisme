import React from 'react';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

const RenderCheckboxAsButton = ({ input, val, hide, useNewValue, newValue }) => (
  <div>
  {hide ? 
    <input {...input} id={input.name} type="hidden" value={useNewValue ? newValue : input.value} />
  : 
    <div>
      <input {...input} type="checkbox" id={input.name} className={cx('hide-checkbox')} value={val} checked={useNewValue ? newValue : input.value}/>
      <label htmlFor={input.name}>{val}</label>
    </div>
  }
    
  </div>
);

RenderCheckboxAsButton.propTypes = {
  input: React.PropTypes.object.isRequired,
  val: React.PropTypes.string.isRequired
};

export default RenderCheckboxAsButton;