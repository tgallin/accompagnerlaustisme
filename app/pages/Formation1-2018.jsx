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
      { name: 'description', content: `L’objectif de la formation est de former des professionnels et parents aux bases de l’Analyse du Comportement Appliquée (ABA).
      14 & 15 octobre 2017.
      Les sciences du comportement.
      Les 7 dimensions de l’ABA.
      Les trois termes de la contingence.
      Les approches basées sur l’ABA.
      Principes de base : renforcement, extinction ...
      Les différents types de renforçateurs.
      Quelques procédures d’enseignement (Pratiques fondées sur les preuves).
      Pairing, Enseignement sans erreur, Guidances, Estompage, Façonnement,
      Chaînage, Imitation, Modeling, Autogestion, Maintien des acquis, Généralisation.
      Ghadeer Barghouthy, Consultante indépendante, certifiée BCBA
      ` }
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

