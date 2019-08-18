const mongoose = require('mongoose');

const server = '127.0.0.1:27017';
const database = 'nodemin';

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
