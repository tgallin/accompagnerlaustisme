import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/loading';

const cx = classNames.bind(styles);

class Loading extends React.Component {
  render() {
    let { isLoading, children } = this.props;

    if (isLoading) {
      return (
        <div>
          <div className={cx('block')}>
            <span className={cx('ouro','ouro3')}>
              <span className={cx('left')}><span className={cx('anim')}></span></span>
              <span className={cx('right')}><span className={cx('anim')}></span></span>
            </span>
          </div>
          {children || null}
        </div>
      );
    }
    else {
      return (<div>{children || null}</div>);
    }
  }
}


Loading.propTypes = {
  isLoading: React.PropTypes.bool
};

Loading.defaultProps = {
  isLoading: false,
};


module.exports = Loading;