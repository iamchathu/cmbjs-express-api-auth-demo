'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const validator = require('validator');
const mongooseHidden = require('mongoose-hidden')();

const validateProperty = function(property) {
  return (property.length);
};

/**
 * A Validation function for local strategy email
 */
const validateEmail = function(email) {
  return (validator.isEmail(email, {require_tld: false}));
};

/**
 * User Schema
 */
const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateProperty, 'Please fill in first name']
  },
  lastName: {
    type: String,
    trim: true,
    default: '',
    validate: [validateProperty, 'Please fill in last name']
  },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateEmail, 'Please fill a valid email address']
  },
  password: {
    type: String,
    validate: [
      validateProperty, 'Please fill a valid password'
    ],
    hideJSON: true
  },
  salt: {
    type: String,
    hideJSON: true
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: [
      'active', 'inactive', 'removed'
    ],
    default: 'active'
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 100000, 512, 'sha512').toString('base64');
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.plugin(mongooseHidden, {
  hidden: {
    _id: false,
    __v: true
  }
});

mongoose.model('User', UserSchema);
