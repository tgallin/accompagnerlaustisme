export const sessionSecret = process.env.SESSION_SECRET;
export const google = {
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
};

export const github = {
  clientID: process.env.GITHUB_CLIENTID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK
};

export default {
  sessionSecret,
  google,
  github
};

