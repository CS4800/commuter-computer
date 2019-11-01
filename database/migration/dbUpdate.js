const gasPriceUpdate = require('./gasPriceUpdate');
const rentPriceUpdate = require('./rentPriceUpate');

function dbUpdate() {
  let updates = [gasPriceUpdate(), rentPriceUpdate()];

  Promise.all(updates)
    .then(() => console.log(`Mongo update finished on ${new Date()}`))
    .catch(e => console.log(`Mongo update failed on ${new Date()}: ${e}`));
}

module.exports = dbUpdate;
