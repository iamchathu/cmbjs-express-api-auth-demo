'use strict';

const mongoose = require('mongoose');
const Item = mongoose.model('Item');

module.exports.read = (req, res) => {
  res.status(200).json(req.item);
};

module.exports.list = (req, res) => {
  let query = {};
  if (req.query.itemCode) {
    query.itemCode = req.query.itemCode;
  }
  if (req.query.itemName) {
    query.itemName = req.query.itemName;
  }
  Item.find(query).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(422).json(err);
  });
};

module.exports.create = (req, res) => {
  let item = new Item(req.body);
  item.save().then((data) => {
    if (!data) {
      res.status(422).json({message: "An error occured saving item!"});
    }
    res.status(200).json(data);
  }).catch((err) => {
    res.status(422).json(err);
  })
};

module.exports.itemById = (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({message: 'Item Id is invalid'});
  }
  Item.findById(id).then((item) => {
    if (item) {
      req.item = item;
      return next();
    } else
      return next(new Error('Failed to load item ' + id));
    }
  ).catch((err) => {
    return next(err);
  });
};

module.exports.update = (req, res) => {
  let item = req.item;
  item.updated = Date.now();

  item.save(function(err) {
    if (err) {
      return res.status(422).json({message: err});
    }
    res.json(item);
  });
};

module.exports.delete = (req, res) => {
  let item = req.item;
  item.remove(function(err) {
    if (err) {
      return res.status(422).json(err);
    }
    res.status(200).json(item);
  });
};
