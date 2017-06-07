import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  return User.findOne({ google: profile.id }, (findByGoogleIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.emails[0].value }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        
        existingEmailUser.google = profile.id;
        existingEmailUser.tokens.push({ kind: 'google', accessToken });
        existingEmailUser.profile.gender = existingEmailUser.profile.gender || profile._json.gender;
        existingEmailUser.profile.picture = existingEmailUser.profile.picture || profile._json.picture;
        return existingEmailUser.save((err) => {
          done(err, existingEmailUser, { message: 'Le compte Google a été lié.' });
        });
      }
      const user = new User();
      user.email = profile._json.emails[0].value;
      user.google = profile.id;
      user.tokens.push({ kind: 'google', accessToken });
      user.profile.displayName = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile._json.picture;
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
