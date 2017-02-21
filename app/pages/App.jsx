import React from 'react';
import Page from '../pages/Page';
import AppContainer from '../containers/App';
import Navigation from '../containers/Navigation';
import Loading from '../containers/Loading';
import Footer from '../containers/Footer';
import { title, meta, link } from './assets';

const App = props => (
  <Page title={title} meta={meta} link={link}>
    <Loading />
    <Navigation />
    <AppContainer {...props} />
    <Footer />
  </Page>
);

export default App;

