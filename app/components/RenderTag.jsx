import React from 'react';

import classNames from 'classnames/bind';

import styles from '../css/components/toy';

const cx = classNames.bind(styles);

const RenderTag = ({ input, tag }) => (
  <div>
    <input {...input} type="checkbox" id={input.name} className={cx('hide-checkbox')} value={tag} checked={input.value}/>
    <label htmlFor={input.name}>{tag}</label>
  </div>
);

RenderTag.propTypes = {
  input: React.PropTypes.object.isRequired,
  tag: React.PropTypes.string.isRequired
};

export default RenderTag;