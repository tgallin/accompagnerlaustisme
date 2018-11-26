import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation1-2019';

class Formation1 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Les comportements sexuels';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Les comportements sexuels. Gérer les comportement sexuels inadaptés. Bien être – Respect - Intimité.
      Accompagner l’Autisme en partenariat avec LearnEnjoy
      2 & 3 mars 2019. Les personnes avec handicap mental suivent les mêmes étapes de développement dans le domaine de la
sexualité. Toutefois le défaut d’accès aux codes sociaux subtils dans ce domaine peut rendre leur
éducation sexuelle difficile. Les accompagner, avec bienveillance et sans tabou dans cette voie, participe à
leur bien-être physique et mental. Manon LOISEAUX` }
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

