import { Strategy as GitHubStrategy } from 'passport-github';
import { github } from '../../../secrets';
import unsupportedMessage from '../../db/unsupportedMessage';
import { passport as dbPassport } from '../../db';

export default (passport) => {
  if (!dbPassport || !dbPassport.github || !typeof dbPassport.github === 'function') {
    console.warn(unsupportedMessage('passport-github'));
    return;
  }

  passport.use(new GitHubStrategy({
    clientID: github.clientID,
    clientSecret: github.clientSecret,
    callbackURL: github.callbackURL
  }, dbPassport.github));
};
