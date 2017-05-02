import React, { Component } from 'react';
import Page from '../../pages/Page';
import AdminToyTagsContainer from '../../containers/admin/AdminToyTags';

class AdminToyTags extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Administration des mots clés';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'Administration des mots clés qui peuvent être associés à un jeu' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <AdminToyTagsContainer {...this.props} />
      </Page>
    );
  }
}

export default AdminToyTags;

