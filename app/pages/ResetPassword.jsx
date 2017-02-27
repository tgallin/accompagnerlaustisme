import React, { Component } from 'react';
import Page from '../pages/Page';
import ResetPasswordContainer from '../containers/ResetPassword';

class ResetPassword extends Component {
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
      { name: 'description', content: 'Réinitialisation du mot de passe' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ResetPasswordContainer {...this.props} />
      </Page>
    );
  }
}

export default ResetPassword;
