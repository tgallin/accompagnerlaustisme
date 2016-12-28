/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'nightlife-coordinator-secret';
export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '42401283905-tdoksc7thka1g2gt98t46lue3eq593mc.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || 'vzaaqDdg6Q92_945kjUFbZVf',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

export const github = {
  clientID: process.env.GITHUB_CLIENTID || '10b46e1fc8c0b73201db',
  clientSecret: process.env.GITHUB_SECRET || 'fa4a1b244e67646c7619dde6d7eaff0b20afc22c',
  callbackURL: process.env.GITHUB_CALLBACK || '/auth/github/callback'
};

export default {
  sessionSecret,
  google,
  github
};
