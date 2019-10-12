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
  state = {
    homeAddr1: req.body.homeAddr1,
    homeAddr2: req.body.homeAddr2,
    homeCost1: req.body.homeCost1,
    homeCost2: req.body.homeCost2,
    remoteAddr: req.body.remoteAddr,
    startTime: req.body.startTime, // String format HH:mm:ss
    endTime: req.body.endTime, // String format HH:mm:ss
    daysPerWeek: Number(req.body.daysPerWeek),
    income: req.body.income,
    mpg: Number(req.body.mpg),
    gas: null,
    rent: null,
    distance: null,
    duration: null
  };

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
  const { distance, duration } = await distanceMatrix(
    state.homeAddr1,
    state.remoteAddr
  );
  state.distance = distance;
  state.duration = duration;

  // calculate optimal cost
  const result = calculate(state);
  const optimalCost = `You lose $${result.lostCost.toFixed(
    2
  )} in opportunity cost a month \n
  You spend $${result.gasCost.toFixed(2)} a month on gas`;

  // feedback for requester
  const feedback = {
    optimalCost: optimalCost
  };

  res.json(feedback);
}

module.exports = {
  post
};
