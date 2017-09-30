import React, { Component } from 'react';
import Page from '../pages/Page';
import FormationContainer from '../containers/Formation2-2017';

class Formation2 extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Formation Numération de base';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Formation Numération de base. 25 et 26 mars 2017. 
      En passant par la manipulation de matériel concret et par l’adaptation pédagogique, 
      l'élève avec TSA (troubles du spectre autistique), comprend et parvient progressivement 
      à maîtriser le système décimal, le classement des nombres et la comparaison des nombres. 
      Cet apprentissage permet d'introduire les bases de l’addition et de la soustraction. 
      Dans ce cours, les participants apprendront comment etre capable de sélectionner 
      pour chaque enfant les outils pédagogiques et les procédures pour lui 
      apprendre à compter jusqu’à dix, et au delà de dix en comprenant les bases de la construction 
      du système décimal. Cet enseignement tiendra compte du maintien de la motivation tout au long de l’apprentissage.
      Véronique MALLEJAC. Formatrice Epsilon à l’école.` }
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

