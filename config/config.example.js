'use strict';

//Rename this as config.dev.js with your deatils

module.exports = {
  sessionSecret: process.env.SESSION_SECRET,
  sessionExpiry: process.env.JWT_TOKEN_EXPIRE_TIME || 1200,
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/auth-demo',
    options: {
      useMongoClient: true
    },
    // Enable mongoose debug mode
    debug: process.env.MONGODB_DEBUG || false
  },
  seedDB: {
    seed: process.env.MONGO_SEED === 'true'
  }
};
