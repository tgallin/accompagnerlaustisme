import React, {
  Component,
  PropTypes
}
from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import {
  connect
}
from 'react-redux';
import {
  manualLogin,
  signUp,
  toggleLoginMode
}
from '../actions/users';
import styles from '../css/components/login';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const {
      manualLogin,
      signUp,
      user: {
        isLogin
      }
    } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (isLogin) {
      manualLogin({
        email,
        password
      });
    }
    else {
      signUp({
        email,
        password
      });
    }
  }

  renderHeader() {
    const {
      user: {
        isLogin
      },
      toggleLoginMode
    } = this.props;
    if (isLogin) {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Connectez-vous</h1>
          <div className={cx('alternative')}>
            Vous n'avez pas encore de compte ?
            <a
              className={cx('alternative-link')}
              onClick={toggleLoginMode}
            >Je m'enregistre</a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Créez votre compte</h1>
        <div className={cx('alternative')}>
          Vous avez déjà un compte ?
          <a
            className={cx('alternative-link')}
            onClick={toggleLoginMode}
          >Je me connecte</a>
        </div>
      </div>
    );
  }

  render() {
    const {
      isWaiting,
      message,
      isLogin
    } = this.props.user;

    return (
      <div className='container'>
        <div className='row '>
          <div className="col-xs-1"></div>
          <div className="col-xs-10 well">
            { this.renderHeader() }
            <div className={cx('email-container')}>
              <form onSubmit={this.handleOnSubmit}>
                <input
                  className={cx('input')}
                  type="email"
                  ref={(input) => { this.email = input; }}
                 placeholder="email"
                />
                <input
                  className={cx('input')}
                  type="password"
                 ref={(input) => { this.password = input; }}
                  placeholder="mot de passe"
                />
                <div className={cx('hint')}>
                  <div>Exemple</div>
                  <div>email: nom.prenom@abcd.fr, mot de passe: 1234</div>
                </div>
                <p
                  className={cx('message', {
                  'message-show': message && message.length > 0
                })}>{message}</p>
                <div className="text-center">
                  <input
                    className="btn btn-success"
                    type="submit"
                    value={isLogin ? 'Se connecter' : 'Créer'} />
                </div>
              </form>
            </div>
            <div>
              <h3>Ou</h3>
            </div>
            <div className="text-center">
              <a className={'btn ' + cx('btn-social', 'btn-google')} href='/auth/google'><span className="fa fa-google-plus"></span>Utiliser mon compte Google</a>
            </div>
          </div>
          <div className="col-xs-1"></div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({
  user
}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, {
  manualLogin,
  signUp,
  toggleLoginMode
})(LoginOrRegister);
