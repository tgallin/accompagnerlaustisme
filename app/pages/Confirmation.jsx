import React, { Component } from 'react';
import Page from '../pages/Page';
import ConfirmationContainer from '../containers/Confirmation';

class Confirmation extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Confirmation';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Message de confirmation' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ConfirmationContainer {...this.props} />
      </Page>
    );
  }
}

export default Confirmation;

