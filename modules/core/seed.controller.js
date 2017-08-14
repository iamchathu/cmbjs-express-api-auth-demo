'use strict';
const config = require('./../../config/config.dev.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * Seed the database
 */
module.exports.seedUser = (req, res) => {
  if (config.seedDB.seed) {
    User.remove({});
    const user = new User({email: 'iam@chathu.me', firstName: 'Chathu', lastName: 'Vishwajith', password: '1234@abc'});
    user.save();
    res.status(200).send('Database seeded!');
  } else {
    res.status(401).send('Seed not allowed !');
  }
}
