import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/dashboard';

const cx = classNames.bind(styles);

class DashboardNavigation extends Component {
  
  render() {
    
    const {
      user
    } = this.props;
    
    if (user.isAdmin) {
      return (<ul className={'nav ' + cx('nav-sidebar')}>
        <li><Link to="/dashboard/accountSettings" activeClassName={cx('active')}>Mon compte</Link></li>
        <li><Link to="/dashboard/events" activeClassName={cx('active')}>Evènements </Link></li>
        <li><Link to="/dashboard/users" activeClassName={cx('active')}>Utilisateurs</Link></li>
        </ul>
      );
    } else {
      return (<ul className={'nav ' + cx('nav-sidebar')}>
        <li><Link to="/dashboard/accountSettings" activeClassName={cx('active')}>Mon compte</Link></li>
      </ul>);
    }
  };
}

DashboardNavigation.propTypes = {
  user: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, null, null, {pure: false})(DashboardNavigation);
