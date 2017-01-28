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
    return 'Qui sommes nous';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Présentation de l\'assocation accompagner autisme' }
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
