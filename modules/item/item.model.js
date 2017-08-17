'use strict';

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const validateProperty = function(property) {
  return (property.length);
};

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemCode: {
    type: Number,
    index: {
      unique: true,
      sparse: true
    },
    required: true
  },
  itemName: {
    type: String,
    uppercase: true,
    trim: true
  },
  retailPrice: {
    type: Number,
    validate: [validateProperty, 'Please enter retailPrice !']
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
  }
}, {id: false});

ItemSchema.plugin(mongooseHidden, {
  hidden: {
    _id: false,
    __v: true
  }
});

mongoose.model('Item', ItemSchema);
