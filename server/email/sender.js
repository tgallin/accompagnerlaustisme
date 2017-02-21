'use strict';

import { transporter } from './transporter';

export function sendMail(mailOptions, callback) {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, callback);
}

export default {
  sendMail
};