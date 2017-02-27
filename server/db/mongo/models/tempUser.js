/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */


import mongoose from 'mongoose';
import { encrypt } from '../../../crypto';

// Other oauthtypes to be added

/*
 User Schema
 */

const TempUserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  firstname: { type: String, default: '' },
  surname: { type: String, default: '' },
  GENERATED_VERIFYING_URL: String
});

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return encrypt(user.password, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
}

/**
 * Password hash middleware.
 */
TempUserSchema.pre('save', encryptPassword);

// create a TTL
TempUserSchema.createdAt = {
  type: Date,
  expires: '86400s',
  default: Date.now
};
    
/**
 * Statics
 */

TempUserSchema.statics = {};

export default mongoose.model('TempUser', TempUserSchema);
