import React, { Component } from 'react';
import Page from '../pages/Page';
import LiensContainer from '../containers/Liens';

class Liens extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Liens';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Liens utiles' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LiensContainer {...this.props} />
      </Page>
    );
  }
}

export default Liens;

