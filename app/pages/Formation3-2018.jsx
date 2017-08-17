import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation3-2018';

class Formation3 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation La gestion des troubles du comportement';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation La gestion des troubles du comportement' }
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

export default Formation3;

