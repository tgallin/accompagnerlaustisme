import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation2-2019';

class Formation2 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Ateliers pédagogiques';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Atelier ABA animé par Teresa Gomes, Thèmes : ABA de base, apprentissage d’outils visuels, guidance et estompage, formes d’apprentissages (ITT, NET,...)` }
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

export default Formation2;

