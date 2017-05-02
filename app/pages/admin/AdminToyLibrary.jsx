import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyLibraryContainer from '../../containers/admin/AdminToyLibrary';

class AdminToyLibrary extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration de la ludothèque';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration de la ludothèque : des jeux et des catégories de jeux' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyLibraryContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyLibrary;

