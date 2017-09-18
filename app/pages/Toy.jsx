import React, { Component } from 'react';
import Page from '../pages/Page';
import ToyContainer from '../containers/Toy';

class Toy extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Détails d\'un jouet';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Détails d\'un jouet' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ToyContainer {...this.props} />
      </Page>
    );
  }
}

export default Toy;

