'use strict';

const express = require("express");
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const filter = require('content-filter');
const jwt = require('express-jwt');
const cors = require('cors')

const config = require('./config/config.dev.js');
// const auth = require('./config/auth');

const app = express();

const db = mongoose.connect(config.db.uri, config.db.options);
mongoose.Promise = global.Promise;

const UserModel = require('./modules/user/user.model.js');
const ItemModel = require('./modules/item/item.model.js');

app.use(filter());

app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const userAuthRoutes = require('./modules/user/user.auth');
const itemRoutes = require('./modules/item/item.routes');
const seedRoutes = require('./modules/core/seed.routes');

app.use(jwt({secret: config.sessionSecret}).unless({
  path: ['/', '/auth', '/seed']
}));

// app.use(auth.jwtErrorHandler);

app.use('/auth', userAuthRoutes);
app.use('/seed', seedRoutes);
app.use('/v1/item', itemRoutes);

app.get("/", function(req, res) {
  res.send("Welcome to CMBJS Demo API");
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");

app.listen(app.get('port'), function() {
  console.log('%s: Node server started on %s ...', Date(Date.now()), app.get('port'));
});

module.exports = app;
