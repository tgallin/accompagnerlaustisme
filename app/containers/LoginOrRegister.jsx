import React, { Component, PropTypes } from 'react';
import Loading from '../components/Loading';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import {
  manualLogin,
  signUp,
  toggleLoginMode
}
from '../actions/users';
import styles from '../css/components/login';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {

  handleSubmit = (values) => {
    // Do something with the form values
    window.alert('Data submitted! ' + JSON.stringify(values));
    const {
      manualLogin,
      signUp,
      user: {
        isLogin
      }
    } = this.props;
    const email = values.email;
    const password = values.password;

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

  renderForm(message) {
    const {
      user: {
        isLogin
      },
      toggleLoginMode
    } = this.props;
    if (isLogin) {
      return (
        <div>
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
          <LoginForm onSubmit={this.handleSubmit} message={message} />
        </div>
      );
    }

    return (
      <div>
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
        <RegisterForm onSubmit={this.handleSubmit} message={message} />
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
      <Loading isLoading={isWaiting}>
        <div className='container'>
          <div className='row'>
            <div className="col-xs-1"></div>
            <div className="col-xs-10 well">
              <div className={cx('local-container')}>
                { this.renderForm(message) }

              </div>
              <h4>Ou utilisez un de vos comptes externes :</h4>
                <div className="text-center">
                <a alt="google" title="google" className={'btn ' + cx('btn-social', 'btn-social-round', 'btn-google')} href='/auth/google'><span className="fa fa-google-plus"></span></a>
                <a alt="google" title="facebook" className={'btn ' + cx('btn-social', 'btn-social-square', 'btn-facebook')} href='/auth/facebook'><span className="fa fa-facebook"></span></a>
                </div>
            </div>
            <div className="col-xs-1"></div>
          </div>
        </div>
      </Loading>
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
