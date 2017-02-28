import React, { Component } from 'react';
import Page from '../pages/Page';
import AccountSettingsContainer from '../containers/AccountSettings';

class AccountSettings extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Mes infos personnelles';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Configuration de mes infos personnelles' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AccountSettingsContainer {...this.props} />
      </Page>
    );
  }
}

export default AccountSettings;

