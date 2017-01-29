import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (
      <nav className={cx('navigation')} role="navigation">
        <Link
          to="/"
          className={cx('item', 'logo')}
          activeClassName={cx('active')}>Accueil</Link>
        <Link to="/formations" className={cx('item')} activeClassName={cx('active')}>Formations</Link>
        <Link to="/reseau" className={cx('item')} activeClassName={cx('active')}>Réseau accompagnement</Link>
        <Link to="/ludotheque" className={cx('item')} activeClassName={cx('active')}>Ludothèque</Link>
        <Link to="/about" className={cx('item')} activeClassName={cx('active')}>Qui sommes nous</Link>
        <Link to="/contact" className={cx('item')} activeClassName={cx('active')}>Contact</Link>
        <Link to="/liens" className={cx('item')} activeClassName={cx('active')}>Liens</Link>
        { user.authenticated ? (
          <Link
            onClick={logOut}
            className={cx('item')} to="/">Me déconnecter</Link>
        ) : (
          <Link className={cx('item')} to="/login">Se connecter</Link>
        )}
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
