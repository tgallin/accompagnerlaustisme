export const sessionSecret = process.env.SESSION_SECRET;

export const google = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};

export const facebook = {
  clientID: process.env.FACEBOOK_CLIENTID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK
};

export const gmail = {
  clientId: process.env.GMAIL_CLIENTID,
  refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  clientSecret: process.env.GMAIL_SECRET,
  user: process.env.GMAIL_USER
};

export const recaptcha = {
  secretKey: process.env.RECAPTCHA_SECRET_KEY,
  siteKey: process.env.RECAPTCHA_SITE_KEY
};