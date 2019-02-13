const faker = require("faker");
var loremIpsum = require('lorem-ipsum');
const Home = require("./homeModel.js");

var iter = 2500; //# per batch
var batchSize = 4000; //batchs
var item = 0;
var currentBatch = 0;
var insertAllHomes = () => {
  var currentItem = item;
  var homes = [];
  var cities = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];
  for (var i = item; i < (iter + currentItem); i++) {
    var home = generateHomeAttributes({}, i, cities);
    homes.push(home);
    item++;
  }
   Home.collection.insertMany(homes, () => {
     if (currentBatch <= batchSize) {
       currentBatch++;
       console.log(currentBatch);
       insertAllHomes();
     }
   });
};


var generateHomeAttributes = (home, id, cities) => { //if loop loses data!!
    return decorateLowTier(home, id, cities);
};

var decorateLowTier = (home, id, cities) => {
  home.homeId = id;
  home.address = 'street #' + getRandomNumber(2,999);
  home.city = cities[getRandomNumber(0, 4)];
  home.price = getRandomNumber(250000, 9990000);
  home.bedNum =  getRandomNumber(1, 5);
  home.bathNum =  getRandomNumber(1, home.bedNum);
  home.sqFootage = getRandomNumber(350, 1000);
  home.imageUrl = `https://picsum.photos/200/300/?${id}`;
  return home;
};

var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

insertAllHomes();
module.exports = insertAllHomes;
