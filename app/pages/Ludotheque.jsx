import React, { Component } from 'react';
import Page from '../pages/Page';
import LudothequeContainer from '../containers/Ludotheque';

class Ludotheque extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Ludotheque';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Ludothèque de l\'association accompagner l\'autisme. Dossier d’inscription, bulletin d’adhésion et règlement intérieur. Horaires des permanences. Derniers jeux ajoutés. Accès au catalogue. Recherche' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LudothequeContainer {...this.props} />
      </Page>
    );
  }
}

export default Ludotheque;

