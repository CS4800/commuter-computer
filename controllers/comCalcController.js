const calculate = require('../lib/calculate');
const google = require('../lib/googleAPI');
const util = require('../lib/util');
let GasPrice = require('../models/gasPriceModel');
let RentPrice = require('../models/rentPriceModel');

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
    matrices: null
  };
  let results = null;

  // get zillow rent prices for california, pomona
  const rent = await RentPrice.findOne({
    state: 'CA',
    city: 'Pomona'
  });
  state.rent = rent.prices;

  // get california, la gas prices avg
  const gas = await GasPrice.findOne({
    state: 'CA',
    county: 'Los Angeles-Long Beach'
  });
  state.gas = gas.prices;

  // get timezone offset from remote address
  const geo = await google.geocoder(state.remoteAddr); // GPS loc for timezone
  const tz = await google.timezone(geo['lat'], geo['lng']);

  // get next Wednesday and convert startTime/endTime to time since unix epoch
  // with timezone offset
  let wed = util.getNextDay(3);
  state.startTime = util.getUnixEpoch(wed, state.startTime, -tz['rawOffset']);
  state.endTime = util.getUnixEpoch(wed, state.endTime, -tz['rawOffset']);

  // get distance and duration from home address to remot address
  const {
    matrices,
    origin_addresses,
    destination_addresses
  } = await google.distanceMatrix(
    state.homeAddresses[0] + '|' + state.homeAddresses[1],
    state.remoteAddr,
    Math.round(state.startTime / 1000) // millisec to sec
  );
  state.matrices = matrices;

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
