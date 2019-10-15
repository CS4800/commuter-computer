const calculate = require('../lib/calculate');
const { distanceMatrix } = require('../lib/googleAPI');
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

  // get distance and duration from home address to remot address
  const {
    matrices,
    origin_addresses,
    destination_addresses
  } = await distanceMatrix(
    state.homeAddresses[0] + '|' + state.homeAddresses[1],
    state.remoteAddr
  );
  state.matrices = matrices;

  state.homeAddresses[0] = origin_addresses[0] ? origin_addresses[0] : '';
  state.homeAddresses[1] = origin_addresses[1] ? origin_addresses[1] : '';

  // calculate optimal cost
  results = calculate(state);

  res.json(results);
}

module.exports = {
  post
};
