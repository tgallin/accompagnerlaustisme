import React, { Component } from 'react';
import Page from '../pages/Page';
import MentionsContainer from '../containers/Mentions';


class Mentions extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Mentions légales';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Mentions légales' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <MentionsContainer {...this.props} />
      </Page>
    );
  }
}

export default Mentions;
