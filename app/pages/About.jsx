import React, { Component } from 'react';
import Page from '../pages/Page';
import AboutContainer from '../containers/About';

class About extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Qui sommes nous';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Présentation de l\'association Accompagner l\'Autisme, créée en octobre 2016, à Orléans. 
      Les membres fondateurs sont des parents d’enfants autistes, dont certains sont enseignants en école primaire et des professionnels de l’accompagnement.
      D’après ses statuts, cette association a pour objet de :
      favoriser la diffusion d'informations concernant l'autisme et les troubles envahissants du développement par tout moyen ou tout évènement.
      l’animation d’un réseau d’acteurs professionnels autour de l’autisme
      favoriser l'inclusion d'enfants autistes / porteur de handicap dans tout milieu ordinaire (école, sport,médical,...)
      mettre en place un plan d'action pour l'accès à la scolarisation` }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AboutContainer {...this.props} />
      </Page>
    );
  }
}

export default About;
