import request from 'axios';
import { recaptcha } from '../../../../config/secrets';
import { sendMail } from '../../../email/sender';
import { getUser } from './users';

export function verifyCaptchaRequest(data) {
  return request.post('https://www.google.com/recaptcha/api/siteverify', data);
}

/**
 * POST /message
 * sends an email
 */
export function add(req, res) {
  
  var email;
  var displayName;
  if (req.user) {
    email = req.user.email;
    displayName = req.user.profile.firstname + ' ' + req.user.profile.surname;
  } else {
    email = req.body.email;
    displayName = req.body.firstname + ' ' + req.body.surname;
  }
 
   // setup email data with unicode symbols
  var mailOptions = {
      from: '"'+ displayName +'" <'+ email + '>', // sender address
      to: 'thomas.gallin@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
  };

  var callback = function(err, info) {
    if (err) {
      return res.status(500).json({ message: 'Problème lors de l\'envoi du message.'});
    }
    return res.status(200).json({ message: 'Merci ! Votre message a bien été envoyé. Nous essairons de vous répondre rapidement.' });
  };
  
  if (req.user) {
    console.log(mailOptions);
    sendMail(mailOptions, callback);
  } else {
    var captchaData = {
      secret: recaptcha.secretKey,
      response: req.body.captcharesponse
    };

    verifyCaptchaRequest(captchaData)
    .then(response => {
      if (response.status === 200) {
        sendMail(mailOptions, callback);
      } else {
        return res.status(401).json({ message: 'recaptcha invalide' });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: 'Problème lors de la vérification du recaptcha'});
    });
  }
}

export default {
  add
};
