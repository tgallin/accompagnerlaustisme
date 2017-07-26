/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const usersController = controllers && controllers.users;
const toyLibraryController = controllers && controllers.toyLibrary;
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
    app.delete('/users/:id', usersController.removeUser);
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

  // toys routes
  if (toyLibraryController) {
    app.get('/toys', toyLibraryController.allToys);
    app.get('/mytoys', toyLibraryController.allMyToys);
   // app.get('/toys/:id', toyLibraryController.findToy);
   var cpUpload = upload.fields([{ name: 'pictures[0]' }, { name: 'pictures[1]' }, { name: 'pictures[2]' }, { name: 'pictures[3]' }]);
    app.post('/toys', cpUpload, toyLibraryController.saveToy);
    app.post('/toys/changeApprobation', toyLibraryController.changeApprobation);
    app.delete('/toys/:id', toyLibraryController.removeToy);
    app.get('/toys/categories', toyLibraryController.allCategories);
    app.post('/toys/category', toyLibraryController.saveCategory);
    app.delete('/toys/category/:id', toyLibraryController.removeCategory);
    app.get('/toys/tags', toyLibraryController.allTags);
    app.post('/toys/tag', toyLibraryController.saveTag);
    app.delete('/toys/tag/:id', toyLibraryController.removeTag);
  }
  else {
    console.warn(unsupportedMessage('toys routes'));
  }
  
};
