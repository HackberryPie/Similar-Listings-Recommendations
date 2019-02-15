const homes = require("../helpers/homes.js");
const redis = require('redis');
const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const client = redis.createClient({
  port: redisPort,
  host: redisHost
});

client.on('connect', function() {
    console.log('redis connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

const routeHandlers = {
  retrieveOne: (req, res) => {
    var id = req.params.id;
    homes.generateHomes(id, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        client.setex(id, 6000, JSON.stringify(results));
        res.send(results);
      }
    });
  },
  alternateRoute: (req, res) => {
    res.sendStatus(404);
  }
};

module.exports = routeHandlers;
