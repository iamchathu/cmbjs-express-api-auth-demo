'use strict';

const express = require('express');
const mongoose = require('mongoose');

const seedCtrl = require('./seed.controller');

const seedRouter = express.Router();

seedRouter.route('/').get(seedCtrl.seedUser);

module.exports = seedRouter;
