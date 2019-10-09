const calculate = require('../lib/calculate');
const { distanceMatrix } = require('../lib/googleAPI');
const zillowRent = require('../lib/zillowRent');
const gasPrice = require('../lib/gasPrice');

/**
 * Post function for Commuter Calculator to get optimal cost
 *
 * @param {Object} req Requester
 * @param {Object} res Response
 * @return {Object} res.json() Send json feedback response
 */
async function post(req, res) {
  state = {
    homeAddr: req.body.homeAddr,
    remoteAddr: req.body.remoteAddr,
    income: req.body.income,
    homeCost: req.body.homeCost,
    workHours: req.body.workHours,
    distance: null,
    duration: null
  };

  // get zillow rent data for pomona
  const rent = await zillowRent();

  // get current avg california gas prices
  const gas = await gasPrice('CA', 'Los Angeles-Long Beach');

  // get distance and duration from home address to remot address
  const { distance, duration } = await distanceMatrix(
    state.homeAddr,
    state.remoteAddr
  );
  state.distance = distance;
  state.duration = duration;

  // calculate optimal cost
  const result = calculate(state);
  const optimalCost = `You lose $${result.lostCost.toFixed(
    2
  )} in opportunity cost a month`;

  // feedback for requester
  const feedback = {
    gas: gas,
    optimalCost: optimalCost
  };

  res.json(feedback);
}

module.exports = {
  post
};
