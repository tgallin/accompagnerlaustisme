/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,
  profile: {
    displayName: { type: String, default: '' },
    firstname: { type: String, default: '' },
    surname: { type: String, default: '' },
    dateOfBirth : Date,
    gender: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' },
    address: {},
    mobile: String,
    landline: String 
  },
  admin: { type: Boolean, default: false },
  member: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {},
  facebook: {}
});

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

UserSchema.statics = {};

export default mongoose.model('User', UserSchema);
