import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';

const Navigation = ({ user, logOut }) => {
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
          <Link to="/" className='navbar-brand'activeClassName='active'>Accueil</Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/formations" activeClassName='active'>Formations</Link></li>
            <li><Link to="/reseau"activeClassName='active'>Réseau accompagnement</Link></li>
            <li><Link to="/ludotheque"activeClassName='active'>Ludothèque</Link></li>
            <li><Link to="/about" activeClassName='active'>Qui sommes nous</Link></li>
            <li><Link to="/contact" activeClassName='active'>Contact</Link></li>
            <li><Link to="/liens" activeClassName='active'>Liens</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>{ user.authenticated ? (
              <Link onClick={logOut} to="/">Me déconnecter</Link>
            ) : (
              <Link to="/login">Se connecter</Link>
            )}</li>
          </ul>
        </div>
      </div>
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
