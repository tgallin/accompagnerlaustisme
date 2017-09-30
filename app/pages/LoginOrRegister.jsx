import React, { Component } from 'react';
import Page from '../pages/Page';
import LoginOrRegisterContainer from '../containers/LoginOrRegister';

class LoginOrRegister extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Page de connexion';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formulaire de connexion. Créez un compte sur le site de l\'association Accompagner l\'autisme pour pouvoir participer aux formations et emprunter des jeux de la ludothèque.'  }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LoginOrRegisterContainer {...this.props} />
      </Page>
    );
  }
}

export default LoginOrRegister;
