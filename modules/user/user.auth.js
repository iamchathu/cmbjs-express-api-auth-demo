'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.dev.js');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const UserAuthRouter = express.Router();

UserAuthRouter.route('/').post(function(req, res) {
  if (!req.body.email) {
    res.status(401).json({message: "Email not provided !", success: false});
  }
  User.findOne({
    email: req.body.email.toLowerCase()
  }, (err, user) => {
    if (err) {
      res.status(500).json({message: "Unauthorized !", success: false});
    }
    if (!user || !user.authenticate(req.body.password) || user.status != 'active') {
      res.status(401).json({message: "Unauthorized !", success: false});
    } else {
      const token = jwt.sign({
        email: user.email
      }, config.sessionSecret, {expiresIn: config.sessionExpiry});
      res.status(201).json({token: token, success: true});
    }
  });
});

module.exports = UserAuthRouter;
