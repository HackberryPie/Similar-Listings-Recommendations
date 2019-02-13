//Seeding function to test Postgres
const { Pool, Client } = require('pg')
const pool = new Pool();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: '/usr/local/var/postgres/pgData.csv',
    header: [
        {id: 'homeId', title: 'homeId'},
        {id: 'address', title: 'address'},
        {id: 'city', title: 'city'},
        {id: 'price', title: 'price'},
        {id: 'bedNum', title: 'bedNum'},
        {id: 'bathNum', title: 'bathNum'},
        {id: 'sqFootage', title: 'sqFootage'},
        {id: 'imageUrl', title: 'imageUrl'}
    ]
});

 var createTable =`
DROP TABLE IF EXISTS homes;
CREATE TABLE homes (
homeId VARCHAR(60) NOT NULL,
address VARCHAR(60) NOT NULL,
city VARCHAR(60) NOT NULL,
price VARCHAR(60) NOT NULL,
bedNum VARCHAR(60) NOT NULL,
bathNum VARCHAR(60) NOT NULL,
sqFootage VARCHAR(60) NOT NULL,
imageUrl VARCHAR(60) NOT NULL
)`;

var create = () => {
  pool.query(createTable, (err, res) => {
    console.log(err, res)
    pool.end()
  })
}

var iter = 5000; //# per batch
var batchSize = 2000; //batchs
var item = 0;
var currentBatch = 0;

var insertAllHomesPG = () => {
  var currentItem = item;
  var homes = [];
  var cities = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];
  for (var i = item; i < (iter + currentItem); i++) {
    var home = generateHomeAttributes({}, i, cities);
    homes.push(home);
    item++;
  }
    csvWriter.writeRecords(homes)
    .then(() => {
      if (currentBatch <= batchSize) {
         currentBatch++;
         console.log((currentBatch / batchSize) * 100);
        insertAllHomesPG();
      } else {

        var q = `COPY homes FROM 'pgData.csv' DELIMITERS ',' CSV;`;
        pool.query(q, (err, res) => {
          console.timeEnd('timer');
          console.log('end');
        });
      }
    })
    .catch((err) => {
      console.log(err);
    })
 };

var generateAddress = () => {
  return loremIpsum(2, 'words');
}

var generateHomeAttributes = (home, id, cities) => {
    return decorateLowTier(home, id, cities);
};

var decorateLowTier = (home, id, cities) => {
  home.homeId = id;
  home.address = 'street ' + getRandomNumber(2,999);
  home.city = cities[getRandomNumber(0, 4)];
  home.price = getRandomNumber(250000, 9990000);
  home.bedNum =  getRandomNumber(1, 5);
  home.bathNum =  getRandomNumber(1, home.bedNum);
  home.sqFootage = getRandomNumber(350, 1000);
  home.imageUrl = `https://picsum.photos/200/300/?image=${id}`;
  return home;
};

var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

console.time('timer');
insertAllHomesPG();
