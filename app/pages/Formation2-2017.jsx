import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation2-2017';

class Formation2 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Numération de base';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation Numération de base' }
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

