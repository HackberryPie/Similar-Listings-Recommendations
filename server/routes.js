const express = require("express");
const routeHandlers = require("./controllers/homeControllers.js");
const router = express.Router();

const redis = require('redis');
const redisPort = process.env.REDIS_PORT || 6379;
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const client = redis.createClient({
  port: redisPort,
  host: redisHost
});



//check is data is stored in redis
router.get("/:id", cache, routeHandlers.retrieveOne);

function cache(req, res, next) {
    const id = req.params.id;
    client.get(id, function (err, data) {
        if (err) throw err;
        if (data != null) {
          res.send((data));
        } else {
          next();
        }
    });
}


router.get("/*", routeHandlers.alternateRoute);

module.exports = router;
module.exports.client = client;
