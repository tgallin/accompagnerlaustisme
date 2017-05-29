import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyContainer from '../../containers/admin/AdminToy';

class AdminToyCategory extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration d\'un jeu';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration d\'un jeu' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyCategory;

