import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from '../css/components/loading';

const cx = classNames.bind(styles);

class Loading extends React.Component {
  render() {
    let { isLoading, children } = this.props;

    if (isLoading) {
      return (
        <span className="ouro ouro3">
          <span className="left"><span className="anim"></span></span>
          <span className="right"><span className="anim"></span></span>
        </span>
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