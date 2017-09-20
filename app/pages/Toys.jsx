import React, { Component } from 'react';
import Page from '../pages/Page';
import ToysContainer from '../containers/Toys';

class Toys extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Catalogue de jeux';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'catalogue de jeux de la ludothèque accompagner l\'autisme' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ToysContainer {...this.props} />
      </Page>
    );
  }
}

export default Toys;

