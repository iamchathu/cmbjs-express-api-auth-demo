'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

const itemCtrl = require('./item.controller');

const itemRouter = express.Router();

itemRouter.route('/').get(itemCtrl.list).post(itemCtrl.create);

itemRouter.route('/:itemId').get(itemCtrl.read).put(itemCtrl.update).delete(itemCtrl.delete);

itemRouter.param('itemId', itemCtrl.itemById);

module.exports = itemRouter;
