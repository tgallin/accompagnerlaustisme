import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyLibraryLocationContainer from '../../containers/admin/AdminToyLibraryLocation';

class AdminToyLibraryLocation extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration d\'un lieu de la ludothèque';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration d\'un lieu de la ludothèque' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyLibraryLocationContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyLibraryLocation;

