const sleep = require('util').promisify(setTimeout);
const google = require('../../lib/googleAPI');
let RentPrice = require('../models/rentPriceModel');
let cityDistanceModel = require('../models/cityDistanceModel');

async function cityDistanceUpdate() {
  return new Promise(async (resolve, reject) => {
    let sleepTime = 500; // in milliseconds

    // get list of cities in LA County
    let laCities = await RentPrice.find({
      county: 'Los Angeles County'
    });

    // iterate through cities and fixed source city
    for (let srcCity = 0; srcCity < laCities.length; ++srcCity) {
      let filter = {
        state: laCities[srcCity].state,
        city: laCities[srcCity].city,
        county: laCities[srcCity].county
      };
      let model = {
        state: laCities[srcCity].state,
        city: laCities[srcCity].city,
        county: laCities[srcCity].county,
        distances: []
      };

      // try to find if this source city exists in database
      let found = await cityDistanceModel.findOne(filter).exec();

      // if it doesn't exist, generate distances array to target cities
      if (!found) {
        for (let targetCity = 0; targetCity < laCities.length; ++targetCity) {
          if (srcCity != targetCity) {
            // prevent too short interval during google api requests
            console.time('Slept for');
            await sleep(sleepTime);
            console.timeEnd('Slept for');

            const { matrices } = await google.distanceMatrix(
              laCities[srcCity],
              laCities[targetCity]
            );

            if (matrices && matrices.length) {
              let distance = {
                city: laCities[targetCity].city,
                distance: matrices[0].distance.value
              };
              model.distances.push(distance);
              console.log(
                `${targetCity} Google API call for CityDistance: from`,
                `${laCities[srcCity].city} to ${distance.city}`,
                `with distance ${distance.distance}`
              );
            } else {
              console.log(
                `Error updating distance data:`,
                `${laCities[srcCity].city} to ${laCities[targetCity].city}`
              );
            }
          }
        }

        // sort distances array
        model.distances = model.distances.sort(
          (a, b) => a.distance - b.distance
        );

        console.log(`Updating cityDistanceModel: ${laCities[srcCity].city}`);
        console.log('Distances', model.distances);

        // update model data
        await cityDistanceModel
          .findOneAndUpdate(filter, model, {
            new: true,
            upsert: true
          })
          .exec();
      }
    }

    resolve(`Mongo updated: cityDistanceUpdate`);
  });
}

module.exports = cityDistanceUpdate;
