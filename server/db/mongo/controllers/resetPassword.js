import User from '../models/user';
import { initResetPasswordHtml, initResetPasswordText } from '../../../email/constants';
import { sendMail } from '../../../email/sender';
import { encrypt } from '../../../crypto';

var randtoken = require('rand-token');

  // default options
  export var options = {
    resetPasswordURLSuffix: '/resetPassword/${URL}',
    URLLength: 48,

    resetPasswordMailOptions: {
        from: 'Accompagner l\'autisme <accompagner.autisme.webmaster@accompagnerlautisme.com>',
        subject: 'Demande de réinitialisation de mot de passe',
        html: initResetPasswordHtml,
        text: initResetPasswordText
    },
    resetPasswordMailCallback: function(err, info) {
      if (err) {
        throw err;
      } else {
        console.log(info.response);
      }
    },
    shouldSendConfirmation: false,
    confirmMailOptions: {
      from: 'Accompagner l\'autisme <accompagner.autisme.webmaster@accompagnerlautisme.com>',
      subject: 'Mot de passe changé',
      html: '<p>Votre mot de passe a été changé avec succès.</p>',
      text: 'Votre mot de passe a été changé avec succès.'
    },
    confirmSendMailCallback: function(err, info) {
      if (err) {
        throw err;
      } else {
        console.log(info.response);
      }
    }
  };


export function initResetPasswordTokenForUser(email, callback) {

  User.findOne({ email }, (findErr, user) => {
    if (!user) {
      return callback(null, false, { message: `Nous n'avons pas trouvé de compte avec l'adresse email ${email}.` });
    }

    var token = randtoken.generate(options.URLLength);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.save(function(err) {
      callback(err, user);
    });
  });

};

export function sendResetPasswordEmail(host, email, token, callback) {
    
    var r = /\$\{URL}/g;

    // inject newly-created URL into the email's body and FIRE
    // stringify --> parse is used to deep copy
    
    var URL = 'https://' + host + options.resetPasswordURLSuffix.replace(r, token);
    var mailOptions = JSON.parse(JSON.stringify(options.resetPasswordMailOptions));

    mailOptions.to = email;
    mailOptions.html = mailOptions.html.replace(r, URL);
    mailOptions.text = mailOptions.text.replace(r, URL);

    if (!callback) {
      callback = options.resetPasswordMailCallback;
    }
    
    sendMail(mailOptions, callback);
  };

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


export function completeResetPasswordTokenForUser(token, password, callback) {

  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: new Date(Date.now()) } }, function(err, user) {
    if (err) {
      return callback(err, false);
    }
    
    if (!user) {
      return callback(null, false, { message: `La demande de réinitialisation de mot de passe est invalide ou a expirée.` });
    }
    
    encrypt(password, function (err, hash) {
      if (err) {
        return callback(err, false, { message: `Problème lors de l'encryption du mot de passe.` });
      }
      
      user.password = hash;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      user.save(function(err) {
        callback(err, user);
      });
    });
    
  });
};

export default {
  initResetPasswordTokenForUser,
  sendResetPasswordEmail,
  sendConfirmationEmail,
  completeResetPasswordTokenForUser,
};