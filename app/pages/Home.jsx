import React, { Component } from 'react';
import Page from '../pages/Page';
import DashboardContainer from '../containers/Home';

class Dashboard extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Page d\'accueil';
  }

  pageMeta() {
    return [
      { name: 'description', content: `Bienvenue sur le site de l\'association Accompagner l\'Autisme. Orléans. 
      Nous proposons d’une part des formations pour parents et professionnels et d’autre part des accompagnements personnalisés à l’école et à domicile.
      Découvrez également les jeux de notre ludothèque.` }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <DashboardContainer {...this.props} />
      </Page>
    );
  }
}

export default Dashboard;

