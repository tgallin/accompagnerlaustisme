import User from '../models/user';

export default (id, done) => {
  User
    .findById(id)
    .populate('toys')
    .exec(function(err, user) {
      done(err, user);
    });
};
