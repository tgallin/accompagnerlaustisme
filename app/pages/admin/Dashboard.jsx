import React, { Component } from 'react';
import Page from '../../pages/Page';
import DashboardContainer from '../../containers/admin/Dashboard';

class Dashboard extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Mon espace personnel';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Mes jeux, mes formations, mes infos personnelles' }
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

