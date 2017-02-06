import User from '../models/user';

export default (email, password, done) => {
  User.findOne({ email }, (findErr, user) => {
    if (!user) return done(null, false, { message: `Nous n'avons pas trouvé de compte avec l'adresse email ${email}.` });
    return user.comparePassword(password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Mot de passe incorrect' });
    });
  });
};
