import React, { Component, PropTypes } from 'react';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

class RenderCheckboxAsButton extends Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    const { input, hide, useNewValue, newValue } = this.props;
    
    if (hide) {
      if (useNewValue) {
        input.onChange(newValue);
      } else {
        input.onChange(input.value);
      }
    }
  }
  
  render() {
    
    const { input, val, hide, useNewValue, newValue } = this.props;
    
    return (    
    <div>
    {hide ? 
      <input {...input} type="checkbox" id={input.name} className="hide" value={val} checked={useNewValue ? newValue : input.value} />
    : 
      <div>
        <input {...input} type="checkbox" id={input.name} className={cx('hide-checkbox')} value={val} checked={useNewValue ? newValue : input.value}/>
        <label htmlFor={input.name}>{val}</label>
      </div>
    }
      
    </div>
    );
  }
}

RenderCheckboxAsButton.propTypes = {
  input: React.PropTypes.object.isRequired,
  val: React.PropTypes.string.isRequired
};

export default RenderCheckboxAsButton;