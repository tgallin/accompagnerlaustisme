import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation1-2018';

class Formation1 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Introduction à l’Analyse du Comportement Appliquée (ABA)';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Formation Introduction à l’Analyse du Comportement Appliquée (ABA)' }
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

export default Formation1;

