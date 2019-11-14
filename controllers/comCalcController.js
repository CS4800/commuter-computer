const calculate = require('../lib/calculate');
const google = require('../lib/googleAPI');
const util = require('../lib/util');
let GasPrice = require('../database/models/gasPriceModel');
let RentPrice = require('../database/models/rentPriceModel');

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
    matrices: []
  };
  let results = null;

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
    origin_addresses
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
  state.homeAddresses[0] = origin_addresses[0] ? origin_addresses[0] : '';
  state.homeAddresses[1] = origin_addresses[1] ? origin_addresses[1] : '';

  // calculate optimal cost
  results = calculate(state);

  res.json(results);
}

module.exports = {
  post
};
