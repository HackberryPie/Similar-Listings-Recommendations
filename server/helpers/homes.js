const homeHelpers = require("./homesHelpers.js");
const connect = require('../../db/index.js');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/homes';
var MongoClient = require('mongodb').MongoClient;
var url = MONGO_URI;
const client = new MongoClient(url);
const connection = client.connect();

const homes = {
  generateHomes: (id, callback) => {
    var similarListings = homeHelpers.chooseSubsetIds(id);
    return homes.getHomes(id, similarListings, callback);
  },
  getHomes: (id, similarlistings, callback) => {
    var similar = similarlistings;
    connect.then(() => {
      const db = client.db('homes');
      const collection = db.collection('homes');
      collection.find({ homeId: { $in: similar } }).toArray(function(err,results) {
        if (err) {
          console.log('error finding similar homes');
        } else {
          callback(null, results);
        }
      });
    })
  }
};

module.exports = homes;
