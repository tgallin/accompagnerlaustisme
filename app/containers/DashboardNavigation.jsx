import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/dashboard';

const cx = classNames.bind(styles);

class DashboardNavigation extends Component {
  
  render() {
    const {
      user
    } = this.props;
    
    if (user.authenticated) {
      return (<ul className={'nav ' + cx('nav-sidebar')}>
        <li><IndexLink to="/dashboard" activeClassName={cx('active')}>Mon compte</IndexLink></li>
        <li><Link to="/dashboard/events" activeClassName={cx('active')}>Evènements </Link></li>
        <li><Link to="/dashboard/news" activeClassName={cx('active')}>News</Link></li>
        <li><Link to="/dashboard/users" activeClassName={cx('active')}>Utilisateurs</Link></li>
      </ul>);
    } else {
      return (<li><IndexLink to="/dashboard" activeClassName={cx('active')}>Mon compte</IndexLink></li>);
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

export default connect(mapStateToProps)(DashboardNavigation);
