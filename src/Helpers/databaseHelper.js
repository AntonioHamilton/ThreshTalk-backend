require('dotenv').config();
const mongoose = require('mongoose');
const database = require('../Database');

const openConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', (error) => reject(error))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(database.db.connection, database.options);
  });
};

const closeConnection = () => {
  mongoose.connection.close();
};

module.exports = {
  openConnection,
  closeConnection,
};
