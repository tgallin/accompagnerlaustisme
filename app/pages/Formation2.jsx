import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation2';

class Formation2 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation 2';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation 2' }
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

