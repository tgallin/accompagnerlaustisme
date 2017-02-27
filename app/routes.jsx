import React from 'react';
import { Route, IndexRoute } from 'react-router';
//import { fetchVoteData } from './fetch-data';
import {
  App,
  Home,
  Formations,
  Formation1,
  Formation2,
  Formation3,
  Formation4,
  Reseau,
  Ludotheque,
  About,
  Contact,
  Dashboard,
  Liens,
  LoginOrRegister,
  ForgotPassword,
  ResetPassword,
  Confirmation,
  Mentions
}
from './pages';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/formations" component={Formations} />
      <Route path="/formations/formation1" component={Formation1} />
      <Route path="/formations/formation2" component={Formation2} />
      <Route path="/formations/formation3" component={Formation3} />
      <Route path="/formations/formation4" component={Formation4} />
      <Route path="/reseau" component={Reseau} />
      <Route path="/ludotheque" component={Ludotheque} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/liens" component={Liens} />
      <Route path="/dashboard" component={Dashboard} onEnter={requireAuth} />
      <Route path="/login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/resetPassword/:token" component={ResetPassword} />
      <Route path="/mentionslegales" component={Mentions} />
    </Route>
  );
  // <IndexRoute component={Vote} fetchData={fetchVoteData} />
  // 
};
