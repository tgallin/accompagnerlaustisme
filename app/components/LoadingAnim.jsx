import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/loading';

const cx = classNames.bind(styles);

class LoadingAnim extends React.Component {
  render() {
    return (
      <div className={cx('loading')}>
        <div className={cx('block')}>
          <span className={cx('ouro','ouro3')}>
            <span className={cx('left')}><span className={cx('anim')}></span></span>
            <span className={cx('right')}><span className={cx('anim')}></span></span>
          </span>
        </div>
      </div>
    );
  }
}

module.exports = LoadingAnim;