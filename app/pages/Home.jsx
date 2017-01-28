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
    return 'Page d\'accueil et News';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Acceuil et News' }
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

