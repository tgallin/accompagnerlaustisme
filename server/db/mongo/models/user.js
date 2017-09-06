/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
var mongoose = require('mongoose');
var Schema    = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,
  profile: {
    legalStatus: { type: String, default: 'P' }, // Physique ou Morale
    firstname: { type: String, default: '' },
    surname: { type: String, default: '' },
    entityName: { type: String, default: '' },
    dateOfBirth : Date,
    gender: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' },
    address: {},
    mobile: String,
    landline: String
  },
  admin: { type: Boolean, default: false },
  membership: { 
    member: { type: Boolean, default: false },
    from: Date,
    to: Date
  },
  toys: [{ type: Schema.Types.ObjectId, ref: 'Toy' }],
  toysBorrowed:  [{ type: Schema.Types.ObjectId, ref: 'Toy' }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {},
  facebook: {}
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

UserSchema
.virtual('profile.displayName')
.get(function () {
  if (this.profile.legalStatus === 'P') {
    return this.profile.firstname + ' ' + this.profile.surname;
  } else {
    return this.profile.entityName;
  }
  
})
.set(function (displayName) {
  this.set('profile.firstname', displayName);
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
