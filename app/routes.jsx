import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { beginLoadUser, loadUserSuccess, loadUserError } from 'actions/users';
import { fetchUsersData, fetchToys, fetchOnlineToys, fetchMyToysAndCategoriesAndTags, fetchToyCategoriesAndTags, fetchToyTags, fetchToyLibraries  } from './fetch-data';
import { userService } from 'services';
import {
  App,
  Home,
  Formations,
  Formation1_2017,
  Formation2_2017,
  Formation3_2017,
  Formation4_2017,
  Formation1_2018,
  Formation2_2018,
  Formation3_2018,
  Formation4_2018,
  Reseau,
  Ludotheque,
  About,
  Contact,
  Dashboard,
  AccountSettings,
  PersonalData,
  ContactDetails,
  LoginDetails,
  MyToys,
  MyToy,
  AdminNews,
  AdminEvents,
  AdminUsers,
  AdminUser,
  AdminToyLibrary,
  AdminToy,
  AdminToys,
  AdminToyCategories,
  AdminToyCategory,
  AdminToyTags,
  AdminToyTag,
  AdminToyLibraryLocations,
  AdminToyLibraryLocation,
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
    const { user: { authenticated, loaded }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
      callback();
    } else if (!loaded) {
      store.dispatch(beginLoadUser());
  
      userService.getUser()
        .then(response => {
          if (response.status === 200) {
            store.dispatch(loadUserSuccess(response.data));
          } else {
            store.dispatch(loadUserError('Oops! Something went wrong!'));
          }
          callback();
        })
        .catch(err => {
          store.dispatch(loadUserError(err.response && err.response.data && err.response.data.message));
          callback();
        });
    } else {
      callback();
    }
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/dashboard'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/formations" component={Formations} />
      <Route path="/formations/formation1-2017" component={Formation1_2017} />
      <Route path="/formations/formation2-2017" component={Formation2_2017} />
      <Route path="/formations/formation3-2017" component={Formation3_2017} />
      <Route path="/formations/formation4-2017" component={Formation4_2017} />
      <Route path="/formations/formation1-2018" component={Formation1_2018} />
      <Route path="/formations/formation2-2018" component={Formation2_2018} />
      <Route path="/formations/formation3-2018" component={Formation3_2018} />
      <Route path="/formations/formation4-2018" component={Formation4_2018} />
      <Route path="/reseau" component={Reseau} />
      <Route path="/ludotheque" component={Ludotheque} fetchData={fetchOnlineToys} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/liens" component={Liens} />
      <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}>
        <IndexRedirect to="/dashboard/accountSettings" />
        <Route path="/dashboard/accountSettings" component={AccountSettings}>
          <IndexRedirect to="/dashboard/accountSettings/personalData" />
          <Route path="/dashboard/accountSettings/personalData" component={PersonalData} />
          <Route path="/dashboard/accountSettings/contactDetails" component={ContactDetails} />
          <Route path="/dashboard/accountSettings/loginDetails" component={LoginDetails} />
        </Route>
        <Route path="/dashboard/mytoys" component={MyToys} fetchData={fetchMyToysAndCategoriesAndTags}>
          <Route path="/dashboard/mytoys/:id" component={MyToy} />
        </Route>
        <Route path="/dashboard/news" component={AdminNews} />
        <Route path="/dashboard/events" component={AdminEvents} />
        <Route path="/dashboard/users" component={AdminUsers} fetchData={fetchUsersData}>
          <Route path="/dashboard/users/:id" component={AdminUser}/>
        </Route>
        <Route path="/dashboard/toyLibrary" component={AdminToyLibrary} >
          <IndexRedirect to="/dashboard/toyLibrary/toys"/>
          <Route path="/dashboard/toyLibrary/toys" component={AdminToys} fetchData={fetchToys} >
            <Route path="/dashboard/toyLibrary/toys/:id" component={AdminToy} />
          </Route>
          <Route path="/dashboard/toyLibrary/categories" component={AdminToyCategories} fetchData={fetchToyCategoriesAndTags}>
            <Route path="/dashboard/toyLibrary/categories/:id" component={AdminToyCategory} />
          </Route>
          <Route path="/dashboard/toyLibrary/tags" component={AdminToyTags} fetchData={fetchToyTags}>
            <Route path="/dashboard/toyLibrary/tags/:id" component={AdminToyTag} />
          </Route>
          <Route path="/dashboard/toyLibrary/locations" component={AdminToyLibraryLocations} fetchData={fetchToyLibraries}>
            <Route path="/dashboard/toyLibrary/locations/:id" component={AdminToyLibraryLocation} />
          </Route>
        </Route>
      </Route>
      <Route path="/login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/resetPassword/:token" component={ResetPassword} />
      <Route path="/mentionslegales" component={Mentions} />
    </Route>
  );
};
