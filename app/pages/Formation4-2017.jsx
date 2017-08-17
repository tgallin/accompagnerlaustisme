import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation4-2017';

class Formation4 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Entraînement aux Réponses Pivots (PRT)';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation Entraînement aux Réponses Pivots (PRT)' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <FormationContainer {...this.props} />
      </Page>
    );
  }
}

export default Formation4;

