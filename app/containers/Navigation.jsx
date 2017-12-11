import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import star from '../images/star.png';

const cx = classNames.bind(styles);

class Navigation extends Component {
  
  
  renderUserLink() {
    const {
      user
    } = this.props;
    if (user.profile.picture) {
      return (<Link to="/dashboard" className={cx('linkWithImage')}><img alt="photo utilisateur" src={user.profile.picture} className={cx('profilePicture')} height="42" /><span className={cx('displayName')}>{user.displayName}</span></Link>);
    } else {
      return (<Link to="/dashboard"><i className="fa fa-user" aria-hidden="true"></i><span className={cx('displayName')}>{user.displayName}</span></Link>);
    }
  }
  
  renderRightNav() {
    const {
      user,
      logOut
    } = this.props;
    if (user.authenticated) {
      return (<ul className="nav navbar-nav navbar-right">
        <li>{ this.renderUserLink() }</li>
        <li><Link onClick={logOut} to="/"><i className="fa fa-power-off" aria-hidden="true"></i></Link></li>
      </ul>);
    } else {
      return (<ul className="nav navbar-nav navbar-right"><li><Link to="/login" activeClassName={cx('active')}>Se connecter</Link></li></ul>);
    }
  }

  render() {
    return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Inverser</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <IndexLink to="/" className='navbar-brand'activeClassName='active'><i className="fa fa-home fa-2" aria-hidden="true"></i></IndexLink>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/formations" className={cx('navbar-nav-link')} activeClassName={cx('active')}><img src={star} className={cx('star')}/>Formations</Link></li>
            <li><Link to="/reseau" className={cx('navbar-nav-link')} activeClassName={cx('active')}><img src={star} className={cx('star')}/>Réseau</Link></li>
            <li><Link to="/ludotheque" className={cx('navbar-nav-link')} activeClassName={cx('active')}><img src={star} className={cx('star')}/>Ludothèque</Link></li>
            <li><Link to="/about" className={cx('navbar-nav-link')} activeClassName={cx('active')}><img src={star} className={cx('star')} />Qui sommes nous</Link></li>
            <li><Link to="/contact" className={cx('navbar-nav-link')} activeClassName={cx('active')}><img src={star} className={cx('star')}/>Contact</Link></li>
            <li><Link to="/liens" className={cx('navbar-nav-link')} activeClassName={cx('active')}><img src={star} className={cx('star')}/>Liens</Link></li>
          </ul>
            { this.renderRightNav() }
        </div>
      </div>
    </nav>
    );
  };
}

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut }, null, {pure: false})(Navigation);
