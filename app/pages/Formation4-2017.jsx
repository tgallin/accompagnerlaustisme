import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation4-2017';

class Formation4 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Entraînement aux Réponses Pivots (PRT)';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Formation Entraînement aux Réponses Pivots (PRT). 
      L'objectif de la formation est d'apporter aux parents et aux professionnels des connaissances de base sur l'approche PRT (l'Entraînement Aux Réponses Pivots) 
      et de les former à utiliser les variables de motivation et l'outil d'autogestion pour promouvoir l'apprentissage du langage chez les adolescents et enfants avec autisme. Ghadeer Barghouthy, Consultante indépendante, certifiée BCBA` }
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

export default Formation4;

