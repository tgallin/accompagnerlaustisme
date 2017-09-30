import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation1-2017';

class Formation1 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Apprendre à lire et à écrire';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Formation Apprendre à lire et à écrire. 14 et 15 janvier 2017. Ce cours a pour but de donner les bases nécessaires pour assurer le soutien scolaire d’un élève à besoins particuliers en début de primaire au niveau de l’apprentissage de la lecture et de l’écriture.
      Vous découvrirez comment l’explication du code, le déchiffrage et la compréhension peuvent être décomposés en étapes pertinentes et adaptées en fonction des particularités de l’élève.
      Véronique MALLEJAC, Formatrice Epsilon à l’école.` }
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

