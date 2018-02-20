import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyBookingContainer from '../../containers/admin/AdminToyBooking';

class AdminToyBooking extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration d\'un emprunt d\'un jeu de la ludothèque';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration d\'un emprunt d\'un jeu de la ludothèque' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyBookingContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyBooking;

