const { calculate, calculateSuggestion } = require('../lib/calculate');
const google = require('../lib/googleAPI');
const util = require('../lib/util');
let GasPrice = require('../database/models/gasPriceModel');
let RentPrice = require('../database/models/rentPriceModel');
let CityDistance = require('../database/models/cityDistanceModel');

/**
 * Post function for Commuter Calculator to get optimal cost
 *
 * @param {Object} req Requester
 * @param {Object} res Response
 * @return {Object} res.json() Send json feedback response
 */
async function post(req, res) {
  let state = {
    homeAddresses: [req.body.homeAddr1, req.body.homeAddr2],
    homeCosts: [req.body.homeCost1, req.body.homeCost2],
    remoteAddr: req.body.remoteAddr,
    startTime: req.body.startTime, // String format HH:mm:ss
    endTime: req.body.endTime, // String format HH:mm:ss
    daysPerWeek: Number(req.body.daysPerWeek),
    income: req.body.income,
    mpg: Number(req.body.mpg),
    gas: null,
    rent: null,
    matrices: [],
    suggestedLocations: [],
    suggestedMatrices: [],
    suggestedRents: []
  };
  let results = null,
    suggestedResults = null;

  // wait for all concurrent calls to finish
  const [rent, gas, geo] = await Promise.all([
    // get zillow rent prices for california, pomona
    RentPrice.findOne({
      state: 'CA',
      city: 'Pomona'
    }),

    // get california, la gas prices avg
    GasPrice.findOne({
      state: 'CA',
      county: 'Los Angeles-Long Beach'
    }),

    // get geo location for timezone
    google.geocoder(state.remoteAddr)
  ]);

  // update state's rent/gas
  state.rent = rent.prices;
  state.gas = gas.prices;

  // get timezone from geo location
  const { rawOffset } = await google.timezone(geo['lat'], geo['lng']);

  // get next Wednesday and convert startTime/endTime to time since unix epoch
  // with timezone offset
  let wed = util.getNextDay(3);
  state.startTime = util.getUnixEpoch(wed, state.startTime, -rawOffset);
  state.endTime = util.getUnixEpoch(wed, state.endTime, -rawOffset);

  // get distance and duration from start to remote
  // with departure time 1 hour before startTime
  const {
    matrices: startMatrices,
    origin_addresses,
    destination_addresses
  } = await google.distanceMatrix(
    state.homeAddresses[0] + '|' + state.homeAddresses[1],
    state.remoteAddr,
    Math.round(state.startTime / 1000) - 3600 // in seconds
  );

  // get distance and duration from remote to start
  const { matrices: endMatrices } = await google.distanceMatrix(
    state.remoteAddr,
    state.homeAddresses[0] + '|' + state.homeAddresses[1],
    Math.round(state.endTime / 1000) // in seconds
  );

  // add to state.matrices in pair of start/end
  for (let i = 0; i < startMatrices.length; ++i)
    state.matrices.push({ start: startMatrices[i], end: endMatrices[i] });

  // reset home addresses to full addresses from api
  state.homeAddresses[0] = origin_addresses[0] || state.homeAddresses[0];
  state.homeAddresses[1] = origin_addresses[1] || state.homeAddresses[1];
  state.remoteAddr = destination_addresses[0] || state.remoteAddr;

  // calculate optimal cost
  results = calculate(state);

  // FIND SUGGESTIONS

  // extract remote address city
  let split = state.remoteAddr.split(',');
  let remoteCity = split[split.length - 3].trim();

  // extract state in remote address
  let remoteState = split[split.length - 2].trim().split(' ')[0];

  // find neareby city in database using remote address's city
  let nearbyCities = await CityDistance.findOne({
    state: remoteState,
    county: 'Los Angeles County',
    city: remoteCity
  });

  if (nearbyCities) {
    for (let i = 0; i < 4; ++i) {
      let nearbyCity = nearbyCities.distances[i];

      // get distance and duration from start to remote
      // with departure time 1 hour before startTime
      const { matrices: startSuggestMatrix } = await google.distanceMatrix(
        `${nearbyCity.city}, ${nearbyCities.state}`,
        state.remoteAddr,
        Math.round(state.startTime / 1000) - 3600 // in seconds
      );

      state.suggestedMatrices.push({
        start: startSuggestMatrix[0]
      });
      state.suggestedLocations.push(nearbyCity.city);
    }

    suggestedResults = calculateSuggestion(state);

    // sort suggested results by total value
    suggestedResults = suggestedResults.sort(
      (a, b) => Number(a.total.value) - Number(b.total.value)
    );
  }

  res.json({ results: results, suggestions: suggestedResults });
}

module.exports = {
  post
};
