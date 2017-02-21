import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation1';

class Formation1 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation 1';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation 1' }
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

