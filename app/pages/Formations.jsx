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
      { name: 'description', content: `L'association Accompagner l'Autisme organise des formations dispensées par des prestataires certifiés.
      Ces formations sont conformes aux recommandations de la HAS (Haute Autorité de Santé) et l’Anesm (Agence Nationale de l’Evaluation de la qualité des établissement et Services sociaux et Médico-sociaux).
      Les formations et sessions de sensibilisation proposées couvrent des thématiques telles que l’adaptation scolaire, le langage, la gestion des troubles du comportement, ..
      Ces formations sont ouvertes à tous : parents comme professionnels (psychologues, éducateurs spécialisés, AVS, orthophonistes, enseignants,...).` }
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

