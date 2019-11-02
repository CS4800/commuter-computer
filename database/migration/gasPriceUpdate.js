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

    Promise.all(
      prices.map(price => {
        let filter = { state: price.state, county: price.county };

        return GasPrice.findOneAndUpdate(filter, price, {
          new: true,
          upsert: true
        }).exec();
      })
    )
      .then(() => {
        let msg = 'Mongo updated: gasPriceModel';
        console.log(msg);
        resolve(msg);
      })
      .catch(e => reject(`Mongo update gasPriceModel fail: ${e}`));
  });
}

module.exports = gasPriceUpdate;
