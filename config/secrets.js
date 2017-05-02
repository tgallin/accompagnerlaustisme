export const sessionSecret = process.env.SESSION_SECRET || 'something';

export const google = {
  clientID: process.env.GOOGLE_CLIENTID || 'something',
  clientSecret: process.env.GOOGLE_SECRET || 'something',
  callbackURL: process.env.GOOGLE_CALLBACK || 'something'
};

export const facebook = {
  clientID: process.env.FACEBOOK_CLIENTID || 'something',
  clientSecret: process.env.FACEBOOK_SECRET || 'something',
  callbackURL: process.env.FACEBOOK_CALLBACK || 'something'
};

export const gmail = {
  clientId: process.env.GMAIL_CLIENTID || 'something',
  refreshToken: process.env.GMAIL_REFRESH_TOKEN || 'something',
  clientSecret: process.env.GMAIL_SECRET || 'something',
  user: process.env.GMAIL_USER || 'something'
};

export const recaptcha = {
  secretKey: process.env.RECAPTCHA_SECRET_KEY || 'something',
  siteKey: process.env.RECAPTCHA_SITE_KEY || 'something'
};