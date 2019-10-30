const zillowRent = require('../lib/zillowRent');
let RentPrice = require('../models/rentPriceModel');

/**
 * Calls zillowRent() to scrape rental listng. Then, updates mongodb with
 * RentPrice records with findOneAndUpdate with upsert option.
 * Upsert option will create new record if not exist; otherwise it will update
 * existing record.
 *
 * @return none
 */
async function rentPriceUpdate() {
  console.log('Updating: rentPriceModel');

  const prices = await zillowRent('CA');

  for (price of prices) {
    let filter = {
      state: price.state,
      city: price.city,
      metro: price.metro,
      county: price.county
    };

    RentPrice.findOneAndUpdate(
      filter,
      price,
      {
        new: true,
        upsert: true,
        useFindAndModify: false
      },
      e => {
        if (e) console.log(`rentPriceUpdate fail: ${e}`);
      } // need to specify callback or findOneAndUpdate will fail
    );
  }
}

module.exports = rentPriceUpdate;
