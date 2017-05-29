import React, { Component } from 'react';
import Page from '../../pages/Page';
import MyToyContainer from '../../containers/admin/MyToy';

class MyToy extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Configuration d\'un jeu';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Configuration d\'un jeu' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <MyToyContainer {...this.props} />
      </Page>
    );
  }
}

export default MyToy;

