import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminUserContainer from '../../containers/admin/AdminUser';

class AdminUser extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration d\'un utilisateur';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration d\'un utilisateur' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminUserContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminUser;

