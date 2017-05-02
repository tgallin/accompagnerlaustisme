import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyCategoriesContainer from '../../containers/admin/AdminToyCategories';

class AdminToyCategories extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des catégories de jouets';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des catégories de jouets' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyCategoriesContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyCategories;

