/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const topicsController = controllers && controllers.topics;
const messagesController = controllers && controllers.messages;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
    app.post('/initResetPassword', usersController.initResetPassword);
    app.post('/completeResetPassword/:token', usersController.completeResetPassword);
    app.post('/updatePersonalData', usersController.updatePersonalData);
    app.post('/updateContactDetails', usersController.updateContactDetails);
    app.post('/updateEmail', usersController.updateEmail);
    app.post('/updatePassword', usersController.updatePassword);
    app.post('/admin/saveUser', usersController.saveUser);
    app.get('/user/confirm/:token', usersController.confirm);
    app.get('/user', usersController.loadUser);
    app.get('/users', usersController.all);
  }
  else {
    console.warn(unsupportedMessage('users routes'));
  }
  
  if (messagesController) {
    app.post('/message', messagesController.add);
  }
  else {
    console.warn(unsupportedMessage('messages routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/callback
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
      })
    );
  }
  
    if (passportConfig && passportConfig.facebook) {
    // facebook auth
    // Redirect the user to Facebook for authentication. When complete, Facebook
    // will redirect the user back to the application at
    // /auth/facebook/callback
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
      })
    );
  }

  if (passportConfig && passportConfig.github) {
    // github auth
    // Redirect the user to Github for authentication. When complete, Github
    // will redirect the user back to the application at
    // /auth/github/callback
    app.get('/auth/github', passport.authenticate('github'));

    // Github will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/github/callback', passport.authenticate('github', {
      successRedirect: '/dashboard',
      failureRedirect: '/login'
    }));
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  }
  else {
    console.warn(unsupportedMessage('topics routes'));
  }
  
};
