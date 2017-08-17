import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation1-2017';

class Formation1 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Apprendre à lire et à écrire';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation Apprendre à lire et à écrire' }
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

export default Formation1;

