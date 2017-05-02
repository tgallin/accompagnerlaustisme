import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToysContainer from '../../containers/admin/AdminToys';

class AdminToys extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des jouets';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des jouets' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToysContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToys;

