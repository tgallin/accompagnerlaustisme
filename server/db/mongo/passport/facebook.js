import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  
  return User.findOne({ facebook: profile.id }, (findByFacebookIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.email }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        
        existingEmailUser.facebook = profile.id;
        existingEmailUser.tokens.push({ kind: 'facebook', accessToken });
        existingEmailUser.profile.displayName = existingEmailUser.profile.displayName || profile.displayName;
        existingEmailUser.profile.gender = existingEmailUser.profile.gender || profile._json.gender;
        existingEmailUser.profile.picture = existingEmailUser.profile.picture || (profile.photos ? profile.photos[0].value : '');
        return existingEmailUser.save((err) => {
          done(err, existingEmailUser, { message: 'Le compte Facebook a été lié.' });
        });
      }
      const user = new User();
      user.email = profile._json.email;
      user.facebook = profile.id;
      user.tokens.push({ kind: 'facebook', accessToken });
      user.profile.displayName = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile.photos ? profile.photos[0].value : '';
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
