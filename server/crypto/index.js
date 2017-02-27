import bcrypt from 'bcrypt-nodejs';

export function encrypt(value, callback) {

  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return callback(saltErr, false);
    return bcrypt.hash(value, salt, null, (hashErr, hash) => {
      if (hashErr) return callback(hashErr, false);
      return callback(null, hash);
    });
  });
}