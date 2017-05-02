import React, { Component } from 'react';
import Page from '../../pages/Page';
import MyToysContainer from '../../containers/admin/MyToys';

class MyToys extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration de mes jouets';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration de mes jouets' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <MyToysContainer {...this.props} />
      </Page>
    );
  }
}

export default MyToys;

