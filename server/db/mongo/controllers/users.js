import passport from 'passport';
import User from '../models/user';
import Toy from '../models/toy';
import request from 'axios';
import { recaptcha } from '../../../../config/secrets';
import { createTempUser, sendVerificationEmail, options as senderOptions, confirmTempUser } from './emailVerification';
import { initResetPasswordTokenForUser, sendResetPasswordEmail, completeResetPasswordTokenForUser } from './resetPassword';
import { encrypt } from '../../../crypto';

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
      
      user
      .populate('toys', function (err, user) {
        var data = {
          email: user.email,
          admin: user.admin,
          member: user.membership.member,
          displayName: user.profile.displayName,
          profile: user.profile,
          toys: user.toys
        };
        return res.status(200).json({
          message: 'Vous vous êtes connecté avec succès.',
          user: data
        });
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
        return res.status(500).json({ message: 'Problème lors de la vérification du recaptcha'});
      });
}

/**
 * GET /user/confirm
 * Confirm a temp local account
 * by moving the user from the temporary storage to 'persistent' storage
 */
export function confirm(req, res) {
  
  confirmTempUser(req.params.token, function(err, user) {
    if (err)
    {
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
 * POST initResetPassword
 * assigns a reset password token valid for an hour for the provided email
 */
export function initResetPassword(req, res) {
  
  var email = req.body.email;

  initResetPasswordTokenForUser(email, function(err, user, info) {

    if (!user)
      return res.status(500).json(info);

    sendResetPasswordEmail(req.hostname, email, user.resetPasswordToken, function(err, info) {
        if (err)
          return res.status(500).json({ message: 'Problème lors de l\'envoi de l\'email.'});

        return res.status(200).json({ message: 'Une demande de réinitialisation de votre mot de passe a été envoyée !' });
    });
  });
}

/**
 * POST completeResetPassword
 * checks that the reset password token is valid
 * then updates the old password with the one provided
 */
export function completeResetPassword(req, res) {
  
  completeResetPasswordTokenForUser(req.params.token, req.body.password,  function(err, user, info) {
      if (!user)
      {
        return res.status(500).json(info);
      }

      return req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: 'Problème lors de la connexion automatique à votre compte' });
        }
        
        return res.status(200).json({
          message: 'Vous avez réinitialisé votre mot de passe avec succès'
        });
      });
  });
}

/**
 * POST /updatePersonalData Updates the currently logged in users's personal data
 */
export function updatePersonalData(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };

    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
      }
      
      user.profile.firstname = req.body.firstname;
      user.profile.surname = req.body.surname;
      user.profile.dateOfBirth = req.body.dateOfBirth;
      
      user.save(function(err, savedUser) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
        }
        var data = {
          displayName: savedUser.profile.displayName,
          profile: savedUser.profile
        };
        
        return res.status(200).json({ user: data, message: 'Infos personnelles mises à jour avec succès' });
      });
    });
  }
}

/**
 * POST /updateContactDetails Updates the currently logged in users's contact details
 */
export function updateContactDetails(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };

    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
      }
      
      user.profile.address = {
        complement1: req.body.complement1,
        complement2: req.body.complement2,
        complement3: req.body.complement3,
        street: req.body.street,
        postalCode: req.body.postalCode,
        city: req.body.city
      };
      user.profile.mobile = req.body.mobile;
      user.profile.landline = req.body.landline;
      
      user.save(function(err) {
        if (err) {
          return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
        }
        return res.status(200).json({ profile: user.profile, message: 'Coordonnées mises à jour avec succès' });
      });
    });
  }
}

/**
 * POST /updateEmail Updates the currently logged in users's email
 */
export function updateEmail(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };
    const data = {
      email: req.body.email
    };
    
    User.findOne(data, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
      }
      if (user) {
        return res.status(500).json({ message: 'Un compte avec cette adresse email existe déjà !' });
      } else {
        
        User.findOneAndUpdate(query, data, (err, user) => {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          return res.status(200).json({ email: data.email, message: 'Adresse email mise à jour avec succès' });
        });
      }
    });
  }
}

/**
 * POST /updateEmail Updates the currently logged in users's email
 */
export function updatePassword(req, res) {
  if (req.user) {
    
    const query = {
      email: req.user.email
    };
    
    User.findOne(query, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
      }

      encrypt(req.body.password, function (err, hash) {
        if (err) {
          return res.status(500).json({ message: 'Problème lors de l\'encryption du mot de passe.' });
        }
        
        user.password = hash;
    
        user.save(function(err) {
          if (err) {
            return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
          }
          return res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
        });
      });
    });
  }
}

/**
 * POST /saveUser Updates the provided user with provided data
 */
export function saveUser(req, res) {

  if (req.user) {

    const query = {
      email: req.user.email,
      admin: true
    };

    User.findOne(query, (err, adminUser) => {
      if (err) {
        return res.status(500).json({ message: 'Problème technique lors de la recherche de votre compte admin' });
      }

      if (req.body.userId !== '') {

        if (req.body.userId == 0) {

          var newUser = new User();

          newUser.admin = req.body.admin;
          newUser.membership = {
            member: req.body.member,
            from: req.body.memberFrom,
            to: req.body.memberTo
          };
          
          newUser.email = req.body.email;

          newUser.profile.address = {
            complement1: req.body.complement1,
            complement2: req.body.complement2,
            complement3: req.body.complement3,
            street: req.body.street,
            postalCode: req.body.postalCode,
            city: req.body.city
          };
          
          newUser.profile.mobile = req.body.mobile;
          newUser.profile.landline = req.body.landline;
          newUser.profile.firstname = req.body.firstname;
          newUser.profile.surname = req.body.surname;
          newUser.profile.legalStatus = req.body.legalStatus;
          newUser.profile.entityName = req.body.entityName;

          newUser.save(function(err) {
            if (err) {
              var errorMessage = 'Problème technique lors de l\'ajout de l\'utilisateur';
              if (err.code === 11000) {
                errorMessage = 'Un utilisateur avec la même adresse email existe déjà';
              }
              return res.status(500).json({ message: errorMessage });
            }
            return res.status(200).json({ user: newUser, message: 'Utilisateur créé avec succès' });
          });

        }
        else {

          const query = {
            _id: req.body.userId
          };

          User.findOne(query, '-password -tokens -resetPasswordToken -resetPasswordExpires -google -facebook', (err, user) => {
            if (err) {
              return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
            }
            if (!user) {
              return res.status(500).json({ message: 'Cet utilisateur n\'existe plus' });
            }

            user.admin = req.body.admin;
            user.membership = {
              member: req.body.member,
              from: req.body.memberFrom,
              to: req.body.memberTo
            };
            
            user.email = req.body.email;

            user.profile.address = {
              complement1: req.body.complement1,
              complement2: req.body.complement2,
              complement3: req.body.complement3,
              street: req.body.street,
              postalCode: req.body.postalCode,
              city: req.body.city
            };
            user.profile.mobile = req.body.mobile;
            user.profile.landline = req.body.landline;
            user.profile.firstname = req.body.firstname;
            user.profile.surname = req.body.surname;
            user.profile.legalStatus = req.body.legalStatus;
            user.profile.entityName = req.body.entityName;

            user.save(function(err) {
              if (err) {
                return res.status(500).json({ message: 'Problème technique lors de la mise à jour' });
              }
              return res.status(200).json({ user: user, message: 'Utilisateur mis à jour avec succès' });
            });
          });
        }
      }
    });
  }
}

/**
 * GET /user
 */
export function loadUser(req, res) {
  if (req.user) {
    return res.status(200).json(buildUserData(req.user));
  } else {
    res.status(401).json(null);
  }
}

function buildUserData(user) {
  return {
    user: {
      email: user.email,
      admin: user.admin,
      member: user.membership.member,
      profile: user.profile,
      toys: user.toys
    }
  };
}

/**
 * GET /users
 */
export function all(req, res) {
  User.find({}, '-password -tokens -resetPasswordToken -resetPasswordExpires -google -facebook', {sort: {'profile.surname': 1, 'profile.firstname': 1, 'profile.entityName': 1}}, function (err, users) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des utilisateurs' });
    }
    return res.status(200).json( { users : users} );
  });
}

/**
 * GET /users/:name
 */
export function getUsersByName(req, res) {
  const name = req.params.name;
  var nameParts = name.split(' ');

  var queryParts = [];
  for (var i=0; i < nameParts.length; i++) {
    queryParts.push({"profile.firstname": {$regex : nameParts[i], $options: 'i'}});
    queryParts.push({"profile.surname": {$regex : nameParts[i], $options: 'i'}});
  }
  queryParts.push({"profile.entityName": {$regex : name, $options: 'i'}});
  
  const query = { $or: queryParts };
  
  User.find(query, '-password -tokens -resetPasswordToken -resetPasswordExpires -google -facebook', {sort: {'profile.surname': 1, 'profile.firstname': 1, 'profile.entityName': 1}}, function (err, users) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de la récupération des utilisateurs' });
    }
    return res.status(200).json( { users : users} );
  });
}

/**
 * DELETE /users
 */
export function removeUser(req, res) {
  const userId = req.params.id;
  const query = { _id: userId };
  
  User.findOneAndRemove(query, (err) => {
    if (err) {
      return res.status(500).send('Problème technique lors de la suppression');
    }
    
    Toy.remove({owner: userId}, (err) => {
    if (err) {
      return res.status(500).send('Problème lors de la suppression des jeux associés.');
    }});
    return res.status(200).send({ id: userId, message: 'Utilisateur supprimé avec succès' });
  });
}

export default {
  login,
  logout,
  signUp,
  confirm,
  loadUser,
  initResetPassword,
  completeResetPassword,
  updatePersonalData,
  updateContactDetails,
  updateEmail,
  updatePassword,
  all,
  getUsersByName,
  saveUser,
  removeUser
};
