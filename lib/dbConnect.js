
const MongoClient = require('mongodb');

// process.env.MONGODB_URI is needed for when we deploy to Heroku
const connectionURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/contrishare';

function getDB() {
  return MongoClient.connect(connectionURL);
}

module.exports = {
  getDB
};
