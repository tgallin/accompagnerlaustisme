import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation2-2018';

class Formation2 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Enseigner l’écriture aux enfants de maternelle';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation Enseigner l’écriture aux enfants de maternelle' }
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

export default Formation2;

