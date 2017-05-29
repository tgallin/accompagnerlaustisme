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
    return 'Administration des jeux';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des jeux' }
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

