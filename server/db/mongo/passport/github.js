import User from '../models/user';


/* eslint-disable no-param-reassign */
export default (req, token, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({
      github: profile.id
    }, function(err, existingUser) {

      if (existingUser) {
        return done(null, false, {
          message: 'There is already a Github account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
        });
      }
      return User.findById(req.user.id, (findByIdErr, user) => {
        user.github = profile.id;
        user.tokens.push({
          kind: 'github',
          token
        });
        user.profile.name = user.profile.name || profile.displayName;
        user.save((err) => {
          done(err, user, {
            message: 'Github account has been linked.'
          });
        });
      });
    });
  }
  return User.findOne({
    github: profile.id
  }, (findByGithubIdErr, existingUser) => {
    if (existingUser) return done(null, existingUser);
    const user = new User();
    user.github = profile.id;
    user.tokens.push({
      kind: 'github',
      token
    });
    user.profile.name = profile.displayName;
    return user.save((err) => {
      done(err, user);
    });
  });
};
/* eslint-enable no-param-reassign */
