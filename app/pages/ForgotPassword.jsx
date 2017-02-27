import React, { Component } from 'react';
import Page from '../pages/Page';
import ForgotPasswordContainer from '../containers/ForgotPassword';

class ForgotPassword extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Réinitialisation du mot de passe';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Demande de réinitialisation du mot de passe' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ForgotPasswordContainer {...this.props} />
      </Page>
    );
  }
}

export default ForgotPassword;
