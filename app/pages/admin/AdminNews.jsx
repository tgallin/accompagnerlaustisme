import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminNewsContainer from '../../containers/admin/AdminNews';

class AdminNews extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des news';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des news' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminNewsContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminNews;

