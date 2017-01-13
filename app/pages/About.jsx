import React, { Component } from 'react';
import Page from '../pages/Page';
import AboutContainer from '../containers/About';

class About extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'About | Nightlife Coordinator';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'A Nightlife Coordinator application based on the reactGo boilerpolate project.' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AboutContainer {...this.props} />
      </Page>
    );
  }
}

export default About;
