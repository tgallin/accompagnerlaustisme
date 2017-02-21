import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation3';

class Formation3 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation 3';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation 3' }
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

