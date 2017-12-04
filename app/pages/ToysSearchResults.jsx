import React, { Component } from 'react';
import Page from '../pages/Page';

import ToysSearchResultsContainer from '../containers/ToysSearchResults';

class ToysSearchResults extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Recherche de jeux';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Résultat de la recherche de jeux de la ludothèque Accompagner l\'Autisme' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ToysSearchResultsContainer {...this.props} />
      </Page>
    );
  }
}

export default ToysSearchResults;

