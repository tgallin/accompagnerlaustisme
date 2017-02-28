import React, { Component } from 'react';
import Page from '../pages/Page';
import AdminEventsContainer from '../containers/AdminEvents';

class AdminEvents extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des évènements';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des évènements' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminEventsContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminEvents;

