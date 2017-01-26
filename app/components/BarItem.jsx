import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/bar-item';

const cx = classNames.bind(styles);

const BarItem = ({ name, id, going, updateGoing }) => {
  const onUpdateGoing = () => {
    updateGoing(id);
  };

  return (
    <li className={cx('bar-item')} key={id}>
      <div className="info">
        <div className={cx('title')}>
          <span>{name}</span><button
        className={'btn btn-info ' + cx('btn-going')}
        onClick={onUpdateGoing}>{going} going</button>
        </div>

      </div>
    </li>
  );
};

BarItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  going: PropTypes.number.isRequired,
  updateGoing: PropTypes.func.isRequired
};

export default BarItem;
