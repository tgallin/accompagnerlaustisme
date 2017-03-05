import React, { Component } from 'react';
import Page from '../pages/Page';
import PersonalDataContainer from '../containers/PersonalData';

class PersonalData extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Mes infos personnelles';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Configuration de mes infos personnelles' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <PersonalDataContainer {...this.props} />
      </Page>
    );
  }
}

export default PersonalData;

