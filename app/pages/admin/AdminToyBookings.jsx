import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyBookingsContainer from '../../containers/admin/AdminToyBookings';

class AdminToyBookings extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des emprunts des jeux de la ludothèque';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des emprunts des jeux de la ludothèque' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyBookingsContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyBookings;

