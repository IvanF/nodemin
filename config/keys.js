const mongoose = require('mongoose');
const settings = require('../settings');

const server = settings.userdata.server;
const database = settings.userdata.database;

class Database {
  constructor () {
    this._connect()
  }

  _connect () {
    mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true }, function (err) {
      if (err) throw err;

      console.log('Successfully connected to MongoDB');
    })
  }
}

module.exports = new Database();
