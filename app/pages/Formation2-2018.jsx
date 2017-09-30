import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation2-2018';

class Formation2 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Enseigner l’écriture aux enfants de maternelle';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Formation Enseigner l’écriture aux enfants de maternelle. 18 novembre & 19 novembre (matin) 2017. 
      L’objectif est de prévenir la dysgraphie et les troubles de l’écriture chez les enfants présentant un syndrome autistique.
      Motricité fine, délier les doigts. Stylos, papier, table et chaise. Latéralisation. Les contingences spatiales. Formes et mouvement. Les erreurs à éviter.
      Célia CHEYNEL, rééducatrice de l’écriture, formatrice d’enseignants et de rééducateurs` }
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

