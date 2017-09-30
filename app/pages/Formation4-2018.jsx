import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation4-2018';

class Formation4 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Habilités sociales';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Formation Habilités sociales. 17 & 18 mars 2018. Savoir définir les compétences sociales. 
      L’ABA* et la socialisation. Les apports des pratiques comportementales. 
      Evaluation des compétences sociales. Quels outils d’évaluation utiliser ? Comment les utiliser ?
      Les premières compétences sociales. Être capable d’intégrer aux projets individualisés des objectifs sociaux adaptés.
      L’attention sociale comme renforçateur. Comment augmenter la sensibilité sociale.
      Compétences sociales avancées. Quoi enseigner lorsque les bases sociales sont déjà présentes.
      Procédures d’enseignement. Comment développer des procédures efficaces.
      Exemples d’interventions. Exemples d’interventions pour les différents niveaux de développement. Vanessa Riesgo de LearnEnjoy` }
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

