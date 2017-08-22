import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyLibraryLocationsContainer from '../../containers/admin/AdminToyLibraryLocations';

class AdminToyLibraryLocations extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des lieux de la ludothèque';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des lieux de la ludothèque' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyLibraryLocationsContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyLibraryLocations;

