'use strict';

import User from '../models/user';
import TempUser from '../models/tempUser';
import { accountConfirmationHtml, accountConfirmationText } from '../../../email/constants';
import { sendMail } from '../../../email/sender';

var randtoken = require('rand-token');

  /**
   * Retrieve a nested value of an object given a string, using dot notation.
   *
   * @func getNestedValue
   * @param {object} obj - object to retrieve the value from
   * @param {string} path - path to value
   * @param {string} def - default value to return if not found
   */
  var getNestedValue = function(obj, path, def) {
    path = path.split('.');
    for (let i = 0, len = path.length; i < len; i++) {
      if (!obj || typeof obj !== 'object') {
        return def;
      }
      obj = obj[path[i]];
    }

    if (obj === undefined) {
      return def;
    }
    return obj;
  };

  // default options
  export var options = {
    verificationURLSuffix: '/user/confirm/${URL}',
    URLLength: 48,

    // mongo-stuff
    persistentUserModel: User,
    tempUserModel: TempUser,
    tempUserCollection: 'tempusers',
    emailFieldName: 'email',
    passwordFieldName: 'password',
    firstnameFieldName: 'firstname',
    surnameFieldName: 'surname',
    URLFieldName: 'GENERATED_VERIFYING_URL',
    expirationTime: 86400,

    verifyMailOptions: {
        from: 'Accompagner l\'autisme <accompagner.autisme.webmaster@accompagnerlautisme.com>',
        subject: 'Confirmation de votre inscription',
        html: accountConfirmationHtml,
        text: accountConfirmationText
    },
    verifySendMailCallback: function(err, info) {
      if (err) {
        throw err;
      } else {
        console.log(info.response);
      }
    },
    shouldSendConfirmation: false,
    confirmMailOptions: {
      from: 'Accompagner l\'autisme <accompagner.autisme.webmaster@accompagnerlautisme.com>',
      subject: 'Adresse email vérifiée avec succès !',
      html: '<p>Votre compte a été vérifié avec succès.</p>',
      text: 'Votre compte a été vérifié avec succès.'
    },
    confirmSendMailCallback: function(err, info) {
      if (err) {
        throw err;
      } else {
        console.log(info.response);
      }
    }
  };

  /**
   * Helper function for actually inserting the temporary user into the database.
   *
   * @func insertTempUser
   * @param {string} password - the user's password, possibly hashed
   * @param {object} tempUserData - the temporary user's data
   * @param {function} callback - a callback function, which takes an error and the
   *   temporary user object as params
   * @return {function} returns the callback function
   */
function insertTempUser(tempUserData, callback) {

    var newTempUser = new options.tempUserModel(tempUserData);

    newTempUser.save(function(err, tempUser) {
      if (err) {
        return callback(err, null, null);
      }
      return callback(null, null, tempUser);
    });
  };


  /**
   * Attempt to create an instance of a temporary user based off of an instance of a
   * persistent user. If user already exists in the temporary collection, passes null
   * to the callback function; otherwise, passes the instance to the callback, with a
   * randomly generated URL associated to it.
   *
   * @func createTempUser
   * @param {object} user - an instance of the persistent User model
   * @param {function} callback - a callback function that takes an error (if one exists),
   *   a persistent user (if it exists) and the new temporary user as arguments; if the
   *   temporary user already exists, then null is returned in its place
   * @return {function} returns the callback function
   */
export function createTempUser(userData, callback) {
    if (!options.tempUserModel) {
      return callback(new TypeError('Temporary user model not defined. Either you forgot' +
        'to generate one or you did not predefine one.'), null);
    }

    // create our mongoose query
    var query = {};

    query[options.emailFieldName] = userData[options.emailFieldName];

    options.persistentUserModel.findOne(query, function(err, existingPersistentUser) {
      if (err) {
        return callback(err, null, null);
      }

      // user has already signed up and confirmed their account
      if (existingPersistentUser) {
        return callback(null, existingPersistentUser, null);
      }

      options.tempUserModel.findOne(query, function(err, existingTempUser) {
        if (err) {
          return callback(err, null, null);
        }

        // user has already signed up but not yet confirmed their account
        if (existingTempUser) {
          return callback(null, null, null);
        } else {
          
          userData[options.URLFieldName] = randtoken.generate(options.URLLength);

          return insertTempUser(userData, callback);
        }
      });
    });
  };


  /**
   * Send an email to the user requesting confirmation.
   *
   * @func sendVerificationEmail
   * @param {string} email - the user's email address.
   * @param {string} url - the unique url generated for the user.
   * @param {function} callback - the callback to pass to Nodemailer's transporter
   */
export function sendVerificationEmail(host, email, url, callback) {
    
    var r = /\$\{URL\}/g;

    // inject newly-created URL into the email's body and FIRE
    // stringify --> parse is used to deep copy
    
    var URL = 'https://' + host + options.verificationURLSuffix.replace(r, url);
    var mailOptions = JSON.parse(JSON.stringify(options.verifyMailOptions));

    mailOptions.to = email;
    mailOptions.html = mailOptions.html.replace(r, URL);
    mailOptions.text = mailOptions.text.replace(r, URL);

    if (!callback) {
      callback = options.verifySendMailCallback;
    }
    
    sendMail(mailOptions, callback);
  };

  /**
   * Send an email to the user requesting confirmation.
   *
   * @func sendConfirmationEmail
   * @param {string} email - the user's email address.
   * @param {function} callback - the callback to pass to Nodemailer's transporter
   */
export function sendConfirmationEmail(email, callback) {
    var mailOptions = JSON.parse(JSON.stringify(options.confirmMailOptions));
    mailOptions.to = email;
    if (options.shouldSendConfirmation) {
      if (!callback) {
        callback = options.confirmSendMailCallback;
      }
      sendMail(mailOptions, callback);
    }
  };

  /**
   * Transfer a temporary user from the temporary collection to the persistent
   * user collection, removing the URL assigned to it.
   *
   * @func confirmTempUser
   * @param {string} url - the randomly generated URL assigned to a unique email
   */
export function confirmTempUser(url, callback) {
    var TempUser = options.tempUserModel,
      query = {};
    query[options.URLFieldName] = url;

    TempUser.findOne(query, function(err, tempUserData) {
      if (err) {
        return callback(err, null);
      }

      // temp user is found (i.e. user accessed URL before their data expired)
      if (tempUserData) {
        var userData = JSON.parse(JSON.stringify(tempUserData)); // copy data
        var user = new options.persistentUserModel();
        user.profile.displayName = userData[options.firstnameFieldName];
        user.profile.firstname = userData[options.firstnameFieldName];
        user.profile.surname = userData[options.surnameFieldName];
        user.email = userData[options.emailFieldName];
        user.password = userData[options.passwordFieldName];

        // save the temporary user to the persistent user collection
        user.save(function(err, savedUser) {
          if (err) {
            return callback(err, null);
          }

          TempUser.remove(query, function(err) {
            if (err) {
              return callback(err, null);
            }

            if (options.shouldSendConfirmation) {
              sendConfirmationEmail(savedUser.email, null);
            }
            return callback(null, user);
          });
        });


        // temp user is not found (i.e. user accessed URL after data expired, or something else...)
      } else {
        return callback(null, null);
      }
    });
  };


  /**
   * Resend the verification email to the user given only their email.
   *
   * @func resendVerificationEmail
   * @param {object} email - the user's email address
   */
export function resendVerificationEmail(email, callback) {
    var query = {};
    query[options.emailFieldName] = email;

    options.tempUserModel.findOne(query, function(err, tempUser) {
      if (err) {
        return callback(err, null);
      }

      // user found (i.e. user re-requested verification email before expiration)
      if (tempUser) {
        // generate new user token
        tempUser[options.URLFieldName] = randtoken.generate(options.URLLength);
        tempUser.save(function(err) {
          if (err) {
            return callback(err, null);
          }

          sendVerificationEmail(getNestedValue(tempUser, options.emailFieldName), tempUser[options.URLFieldName], function(err) {
            if (err) {
              return callback(err, null);
            }
            return callback(null, true);
          });
        });

      } else {
        return callback(null, false);
      }
    });
  };


export default {
  createTempUser,
  sendVerificationEmail,
  sendConfirmationEmail,
  confirmTempUser,
  resendVerificationEmail
};