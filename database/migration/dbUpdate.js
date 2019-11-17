const mongoose = require('mongoose');
const gasPriceUpdate = require('./gasPriceUpdate');
const rentPriceUpdate = require('./rentPriceUpate');
const cityDistanceUpdate = require('./cityDistanceUpdate');

function checkMongoStatus() {
  return new Promise((resolve, reject) => {
    // connected
    if (mongoose.connection.readyState === 1) resolve(true);
    // connecting
    else if (mongoose.connection.readyState === 2)
      mongoose.connection.on('connected', () => resolve(true));
    // disconnected, close, error
    else reject(false);
  });
}

async function dbUpdate() {
  let updates = [gasPriceUpdate(), rentPriceUpdate()];

  const status = await checkMongoStatus();

  if (status) {
    console.log(`Mongo update starting on ${new Date()}`);

    Promise.all(updates)
      .then(async () => {
        let cityUpdates = await cityDistanceUpdate();
        console.log(cityUpdates);
        console.log(`Mongo update finished on ${new Date()}`);
      })
      .catch(e => console.log(`Mongo update failed on ${new Date()}: ${e}`));
  } else
    console.log(
      `Mongo update attempt failed from bad mongo connection on ${new Date()}`
    );
}

module.exports = dbUpdate;
