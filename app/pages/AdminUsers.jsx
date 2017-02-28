import React, { Component } from 'react';
import Page from '../pages/Page';
import AdminUsersContainer from '../containers/AdminUsers';

class AdminUsers extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des utilisateurs';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des utilisateurs' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminUsersContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminUsers;

