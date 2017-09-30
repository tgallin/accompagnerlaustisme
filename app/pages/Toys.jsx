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
      { name: 'description', content: 'Catalogue de jeux de la ludothèque Accompagner l\'Autisme' }
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

