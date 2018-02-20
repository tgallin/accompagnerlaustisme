import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/dashboard';

const cx = classNames.bind(styles);

class AdminToyLibraryTabs extends Component {

  render() {
    return (
      <ul className={'nav ' + cx('nav', 'nav-tabs')}>
        <li><Link to="/dashboard/toyLibrary/toys" activeClassName={cx('activeTab')}>Jeux</Link></li>
        <li><Link to="/dashboard/toyLibrary/categories" activeClassName={cx('activeTab')}>Catégories</Link></li>
        <li><Link to="/dashboard/toyLibrary/tags" activeClassName={cx('activeTab')}>Mots clés</Link></li>
        <li><Link to="/dashboard/toyLibrary/locations" activeClassName={cx('activeTab')}>Lieux</Link></li>
        <li><Link to="/dashboard/toyLibrary/bookings" activeClassName={cx('activeTab')}>Emprunts</Link></li>
      </ul>
    );
  }
}

export default AdminToyLibraryTabs;
