import React, { Component } from 'react';
import Page from '../../pages/Page';
import ContactDetailsContainer from '../../containers/admin/ContactDetails';

class ContactDetails extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Mes coordonnées';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Configuration de mes coordonnées' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ContactDetailsContainer {...this.props} />
      </Page>
    );
  }
}

export default ContactDetails;

