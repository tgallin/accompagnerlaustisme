import passport from 'passport';
import User from '../models/user';
import request from 'axios';
import { recaptcha } from '../../../../config/secrets';
import { createTempUser, sendVerificationEmail, options as senderOptions, confirmTempUser } from './emailVerification';


export function verifyCaptchaRequest(data) {
  return request.post('https://www.google.com/recaptcha/api/siteverify', data);
}


/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', { badRequestMessage : 'Email ou mot de passe manquants'}, (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'Vous vous êtes connecté avec succès.'
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new temp local account
 */
export function signUp(req, res, next) {
  
  var captchaData = {
    secret: recaptcha.secretKey,
    response: req.body.captcharesponse
  };

  verifyCaptchaRequest(captchaData)
      .then(response => {
        if (response.status === 200) {
          
          var email = req.body.email;

          var userData = {};
          userData[senderOptions.firstnameFieldName] = req.body.firstname;
          userData[senderOptions.surnameFieldName] = req.body.surname;
          userData[senderOptions.emailFieldName] = email;
          userData[senderOptions.passwordFieldName] = req.body.password;
          
          createTempUser(userData, function(err, existingPersistentUser, newTempUser) {

            // user already exists in persistent collection... 
            if (existingPersistentUser) {
              return res.status(409).json({ message: 'Un compte avec cette adresse email existe déjà !' });
            }
 
            // a new user 
            if (newTempUser) {
              
                var URL = newTempUser[senderOptions.URLFieldName];
                sendVerificationEmail(req.hostname, email, URL, function(err, info) {
                    if (err)
                      return res.status(500).json({ message: 'Problème lors de l\'envoi de l\'email de confirmation.'});
         
                    return res.status(200).json({ message: 'Un email de confirmation a été envoyé !' });
                });
            // user already exists in temporary collection... 
            } else {
                return res.status(409).json({ message: 'Un compte temporaire avec cette adresse email existe déjà !' });
            }
          });
        } else {
          return res.status(401).json({ message: 'recaptcha invalide' });
        }
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ message: 'Problème lors de la vérification du recaptcha'});
      });
}

/**
 * GET /user/confirm
 * Confirm a temp local account
 * by moving the user from the temporary storage to 'persistent' storage
 */
export function confirm(req, res) {
  
  confirmTempUser(req.params.url, function(err, user) {
      if (err)
      {
        console.log(err);
        // return res.status(500).json({ message: 'Il y a eu un problème lors de la confirmation de votre compte.' });
        return res.redirect('/login');
      }
          
   
      // user was found! 
      if (user) {
          return req.logIn(user, (loginErr) => {
            if (loginErr) {
              // return res.status(401).json({ message: loginErr });
              return res.redirect('/login');
            }
            
            
            /*return res.status(200).json({
              message: 'Vous avez confirmé la création de votre compte avec succès'
            });*/
            return res.redirect('/dashboard');
          });
      }
      // user's data probably expired... 
      else {
        //return res.status(401).json({ message: 'Il y a eu un problème lors de la confirmation de votre compte. Vous avez attendu trop longtemps avant de valider votre email.' });
        return res.redirect('/login');
      } 
          
  });
}

/**
 * GET /user
 */
export function find(req, res, next) {
  try {
    return getUser(req.user.email);
  } catch(err) {
    console.log('Error trying to find user');
    return res.status(500).send('Problème lors de la récupération des caractéristiques de l\'utilisateur');
  }
}

export function getUser(email) {
  const query = { 'email': email };
  
  User.findOne(query, function(err, existingUser) {
    if (err) {
      throw err;
    }

    return existingUser;
  });
}

export default {
  login,
  logout,
  signUp,
  confirm,
  find
};
