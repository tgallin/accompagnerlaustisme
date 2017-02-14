import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';

class Navigation extends Component {
  
  renderRightNav() {
    const {
      user,
      logOut
    } = this.props;
    if (user.authenticated) {
      return (<ul className="nav navbar-nav navbar-right">
        <li><Link to="/dashboard"><i className="fa fa-user" aria-hidden="true"></i>{user.displayName}</Link></li>
        <li><Link onClick={logOut} to="/"><i className="fa fa-power-off" aria-hidden="true"></i></Link></li>
      </ul>);
    } else {
      return (<ul className="nav navbar-nav navbar-right"><li><Link to="/login">Se connecter</Link></li></ul>);
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
          <Link to="/" className='navbar-brand'activeClassName='active'><i className="fa fa-home fa-2" aria-hidden="true"></i></Link>
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

export default connect(mapStateToProps, { logOut })(Navigation);
