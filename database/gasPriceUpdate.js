const { gasPricesByState } = require('../lib/gasPrice');
let GasPrice = require('../models/gasPriceModel');

/**
 * Calls gasPrice() to scrape gas prices data. Then, updates mongodb with
 * GasPrice records with findOneAndUpdate with upsert option.
 * Upsert option will create new record if not exist; otherwise it will update
 * existing record.
 *
 * @return none
 */
async function gasPriceUpdate() {
  console.log('Updating: gasPriceModel');

  const prices = await gasPricesByState('CA');

  for (price of prices) {
    let filter = { state: price.state, county: price.county };

    GasPrice.findOneAndUpdate(
      filter,
      price,
      {
        new: true,
        upsert: true,
        useFindAndModify: false
      },
      e => {
        if (e) console.log(`GasPriceUpdate fail: ${e}`);
      } // need to specify callback or findOneAndUpdate will fail
    );
  }
}

module.exports = gasPriceUpdate;
