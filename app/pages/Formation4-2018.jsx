import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation4-2018';

class Formation4 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Habilités sociales';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation Habilités sociales' }
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

