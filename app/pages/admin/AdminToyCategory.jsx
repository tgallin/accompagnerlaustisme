import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyCategoryContainer from '../../containers/admin/AdminToyCategory';

class AdminToyCategory extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration d\'une catégorie de jouet';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration d\'une catégorie de jouet' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyCategoryContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyCategory;

