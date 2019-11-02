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

    Promise.all(
      prices.map(price => {
        let filter = {
          state: price.state,
          city: price.city,
          metro: price.metro,
          county: price.county
        };

        return RentPrice.findOneAndUpdate(filter, price, {
          new: true,
          upsert: true
        }).exec();
      })
    )
      .then(() => {
        let msg = 'Mongo updated: rentPriceModel';
        console.log(msg);
        resolve(msg);
      })
      .catch(e => reject(`Mongo update rentPriceModel fail: ${e}`));
  });
}

module.exports = rentPriceUpdate;
