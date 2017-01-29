import React, { Component } from 'react';
import Page from '../pages/Page';
import LudothequeContainer from '../containers/Ludotheque';

class Ludotheque extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Ludotheque';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Préter et emprunter des jeux' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LudothequeContainer {...this.props} />
      </Page>
    );
  }
}

export default Ludotheque;

