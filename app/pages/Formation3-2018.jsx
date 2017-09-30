import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation3-2018';

class Formation3 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation : La gestion des troubles du comportement';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Formation : La gestion des troubles du comportement. 27 & 28 janvier 2018. 
      Quelques bases : mentalisme, renforcement, extinction, punition, guidances, comportement. 
      Evaluation et analyse fonctionnelle. 
      Entraînement à la communication fonctionnelle. 
      Augmenter la coopération.
      Agir selon la fonction du comportement et les 8 compétences essentielles de l’outil Essential For Living : 
      Faire des demandes.
      Attendre après une demande.
      Accepter les retraits d’activités ou items préférés, pour faire des transitions, partager, attendre son tour.
      Faire 10 tâches brèves consécutives acquises.
      Accepter le « non ».
      Suivre des consignes liées à la santé et à la sécurité.
      Réaliser des tâches de vie quotidienne concernant la santé et la sécurité.
      Tolérer des situations liées à la santé et la sécurité. 
      Ghadeer Barghouthy, Consultante indépendante, certifiée BCBA` }
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

