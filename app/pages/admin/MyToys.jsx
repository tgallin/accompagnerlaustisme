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
    return 'Ma liste de jeux';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Ma liste de jeux' }
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

