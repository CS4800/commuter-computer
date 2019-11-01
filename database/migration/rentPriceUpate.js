const zillowRent = require('../../lib/zillowRent');
let RentPrice = require('../models/rentPriceModel');

/**
 * Calls zillowRent() to scrape rental listng. Then, updates mongodb with
 * RentPrice records with findOneAndUpdate with upsert option.
 * Upsert option will create new record if not exist; otherwise it will update
 * existing record.
 *
 * @return none
 */
function rentPriceUpdate() {
  return new Promise(async (resolve, reject) => {
    const prices = await zillowRent('CA');

    for (price of prices) {
      let filter = {
        state: price.state,
        city: price.city,
        metro: price.metro,
        county: price.county
      };

      try {
        await RentPrice.findOneAndUpdate(filter, price, {
          new: true,
          upsert: true
        }).exec();
      } catch (e) {
        reject(`Mongo update gasPriceModel fail: ${e}`);
      }
    }
    console.log('Mongo updated: rentPriceModel');
    resolve('Mongo updated: rentPriceModel');
  });
}

module.exports = rentPriceUpdate;
