const { gasPricesByState } = require('../../lib/gasPrice');
let GasPrice = require('../models/gasPriceModel');

/**
 * Calls gasPrice() to scrape gas prices data. Then, updates mongodb with
 * GasPrice records with findOneAndUpdate with upsert option.
 * Upsert option will create new record if not exist; otherwise it will update
 * existing record.
 *
 * @return none
 */
function gasPriceUpdate() {
  return new Promise(async (resolve, reject) => {
    const prices = await gasPricesByState('CA');

    for (price of prices) {
      let filter = { state: price.state, county: price.county };

      try {
        await GasPrice.findOneAndUpdate(filter, price, {
          new: true,
          upsert: true
        }).exec();
      } catch (e) {
        reject(`Mongo update gasPriceModel fail: ${e}`);
      }
    }
    console.log('Mongo updated: gasPriceModel');
    resolve('Mongo updated: gasPriceModel');
  });
}

module.exports = gasPriceUpdate;
