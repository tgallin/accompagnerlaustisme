import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/dashboard';

const cx = classNames.bind(styles);

class AccountSettingsTabs extends Component {

  render() {
    return (
      <ul className={'nav ' + cx('nav', 'nav-tabs')}>
        <li><Link to="/dashboard/accountSettings/personalData" activeClassName={cx('activeTab')}>Infos personnelles</Link></li>
        <li><Link to="/dashboard/accountSettings/contactDetails" activeClassName={cx('activeTab')}>Coordonnées</Link></li>
        <li><Link to="/dashboard/accountSettings/loginDetails" activeClassName={cx('activeTab')}>Identifiants</Link></li>
      </ul>
    );
  }
}

export default AccountSettingsTabs;
