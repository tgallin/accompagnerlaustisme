import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/bar-item';

const cx = classNames.bind(styles);

const BarItem = ({ name, id, going, updateGoing }) => {
  const onUpdateGoing = () => {
    updateGoing(id);
  };

  return (
    <div className={cx('barc-item')} key={id}>
      <div className="info">
        <div className="title">
          <span>{name}</span>
        </div>
      <button
        className={cx('button', 'increment')}
        onClick={onUpdateGoing}>{going} going</button>
      </div>
    </div>
  );
};

BarItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  going: PropTypes.number.isRequired,
  updateGoing: PropTypes.func.isRequired
};

export default BarItem;
