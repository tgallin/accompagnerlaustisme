import React, { Component } from 'react';
import Page from '../../pages/Page';
import LoginDetailsContainer from '../../containers/admin/LoginDetails';

class LoginDetails extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Mes identifiants';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Configuration de mes identifiants' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LoginDetailsContainer {...this.props} />
      </Page>
    );
  }
}

export default LoginDetails;

