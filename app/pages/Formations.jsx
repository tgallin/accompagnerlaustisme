import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationsContainer from '../containers/Formations';

class Formations extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formations';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formations' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <FormationsContainer {...this.props} />
      </Page>
    );
  }
}

export default Formations;

