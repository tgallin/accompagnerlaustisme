import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation3-2017';

class Formation3 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Projection du film “Enfants autistes : bienvenue à l\'école !”';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Projection du film “Enfants autistes : bienvenue à l\'école !”' }
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

export default Formation3;

