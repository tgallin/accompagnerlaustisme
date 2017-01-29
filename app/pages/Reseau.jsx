import React, { Component } from 'react';
import Page from '../pages/Page';
import ReseauContainer from '../containers/Reseau';

class Reseau extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Réseau Accompagnement';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Connaître notre réseau d\'accompagnateurs' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ReseauContainer {...this.props} />
      </Page>
    );
  }
}

export default Reseau;

