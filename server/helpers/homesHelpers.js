const homeHelpers = {
  chooseSubsetIds: id => {
    const numOfListings = 9;
    if (id < 2500000 ) {
      return homeHelpers.insertSubsetIds(0, 2400000, numOfListings, id);
    } else if (id < 5000000) {
      return homeHelpers.insertSubsetIds(2500000, 4900000, numOfListings, id);
    } else if (id < 7500000) {
      return homeHelpers.insertSubsetIds(5000000, 7400000, numOfListings, id);
    } else {
      return homeHelpers.insertSubsetIds(7500000, 9900000, numOfListings, id);
    }
  },

  insertSubsetIds: (min, max, numOfListings, id) => {
    const subset = [];
    const inserted = {};
    var i = 0;
    while (i < numOfListings) {
      var randomListing = Math.floor(Math.random() * (max + 1 - min)) + min;
      if (!inserted[randomListing] && randomListing !== id) {
        inserted[randomListing] = true;
        subset.push(randomListing);
        i++;
      }
    }
    return subset;
  }
};

module.exports = homeHelpers;
