import React, { Component } from 'react';
import Page from '../pages/Page';
import ToysCatalogueContainer from '../containers/ToysCatalogue';

class ToysCatalogue extends Component {
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
        <ToysCatalogueContainer {...this.props} />
      </Page>
    );
  }
}

export default ToysCatalogue;

