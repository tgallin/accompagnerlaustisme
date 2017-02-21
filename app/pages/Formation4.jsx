import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation4';

class Formation4 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation 4';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation 4' }
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

