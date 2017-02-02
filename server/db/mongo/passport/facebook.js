import User from '../models/user';

/* eslint-disable no-param-reassign */
export default (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({ facebook: profile.id }, (findOneErr, existingUser) => {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.facebook = profile.id;
        user.tokens.push({ kind: 'facebook', accessToken });
        user.profile.name = user.profile.name || profile.displayName;
        user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = user.profile.picture || (profile.photos ? profile.photos[0].value : '');
        user.save((err) => {
          done(err, user, { message: 'Facebook account has been linked.' });
        });
      });
    });
  }
  return User.findOne({ facebook: profile.id }, (findByFacebookIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    return User.findOne({ email: profile._json.email }, (findByEmailErr, existingEmailUser) => {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.' });
      }
      const user = new User();
      user.email = profile._json.email;
      user.facebook = profile.id;
      user.tokens.push({ kind: 'facebook', accessToken });
      user.profile.name = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile.photos ? profile.photos[0].value : '';
      return user.save((err) => {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */
