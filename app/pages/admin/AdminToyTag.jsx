import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyTagContainer from '../../containers/admin/AdminToyTag';

class AdminToyTag extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration d\'un mot clé';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration d\'un mot clé' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyTagContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyTag;

