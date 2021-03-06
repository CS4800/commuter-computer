const axios = require('axios');

/**
 * Cost data with name/value pair
 *
 * @property {String} name The name for this cost
 * @property {Number} value The number value
 * @property {String} status The status of this cost: none, positive, negative
 *                           as '', '+', '-'
 */
class Cost {
  constructor(n = 'Default', v = 0, s = '', tooltip = '') {
    this.name = n;
    this.value = v;
    this.status = s;
    this.tooltip = tooltip;
  }
}

/**
 * Result data with title, body, array of Costs and total Cost
 *
 * @property {String} title The title
 * @property {String} body The body message
 * @property {Array} costs Array of Cost objects
 * @property {Cost} total Cost for total
 */
class Result {
  constructor(t = '') {
    this.title = t;
    this.dest;
    this.body;
    this.costs = [];
    this.total = new Cost('Total', 0);
  }

  // add {Cost} to costs array
  addCost(name = '', value = 0, status = '', tooltip = '') {
    this.costs.push(new Cost(name, value, status, tooltip));
    this.total.value += value;
  }

  // convert all cost value to a fixed precision string
  // do this after all operations
  setPrecision(n) {
    this.costs.forEach(cost => (cost.value = cost.value.toFixed(n)));
    this.total.value = this.total.value.toFixed(n);
  }
}

/**
 * Calculate the optimal cost
 *
 * @param {Object} state
 * @return {Result} result
 */
function calculate(state) {
  let results = [];

  state.matrices.forEach((matrix, i) => {
    let startTravelTime = matrix.start.duration_in_traffic
      ? matrix.start.duration_in_traffic.value / 60 / 60
      : matrix.start.duration.value / 60 / 60;

    let endTravelTime = matrix.end.duration_in_traffic
      ? matrix.end.duration_in_traffic.value / 60 / 60
      : matrix.end.duration.value / 60 / 60;

    let distance = matrix.start.distance.value * 0.000621371;

    // commuteTime (hours/month) =  days worked in a week * weeks in a month * transit time in hours
    let commuteTime = state.daysPerWeek * 4 * (startTravelTime + endTravelTime);

    // lostCost ($/month) = income * commute time
    let lostCost = state.income * commuteTime;

    // gasCost ($/month)=  distance(miles) / mpg * last weeks' avg gas cost
    // * trips per day * days worked in a week * weeks in a month
    let gasCost =
      (distance / state.mpg) *
      state.gas[2]['regular'] *
      2 *
      state.daysPerWeek *
      4;

    // create new Result with title as home address
    result = new Result(state.homeAddresses[i]);
    result.dest = state.remoteAddr;

    // add new Cost to array of result.costs
    let opCostTooltip =
      'Opportunity cost is the loss of potential gain from other alternatives' +
      'when one alternative is chosen. In this case, it is the wages you' +
      'could earn if you were working instead of commuting';
    result.addCost('Opportunity Cost', lostCost, '-', opCostTooltip);
    result.addCost('Gas Cost', gasCost, '-');

    // add mortgage (homecost) if exists
    if (state.homeCosts && state.homeCosts[i])
      result.addCost('Mortgage Cost', Number(state.homeCosts[i]), '-');

    // set result body message
    result.body = `By commuting ${commuteTime.toFixed(
      2
    )} hours a month you lose $${lostCost.toFixed(
      2
    )} in opportunity cost a month. You spend $${gasCost.toFixed(
      2
    )} a month on gas.`;

    // set all result costs to precision of 2
    result.setPrecision(2);

    results.push(result);
  });

  return results;
}

/**
 * Calculate the optimal cost
 *
 * @param {Object} state
 * @return {Result} result
 */
function calculateSuggestion(state) {
  let results = [];

  state.suggestedMatrices.forEach((matrix, i) => {
    let startTravelTime = matrix.start.duration_in_traffic
      ? matrix.start.duration_in_traffic.value / 60 / 60
      : matrix.start.duration.value / 60 / 60;

    let distance = matrix.start.distance.value * 0.000621371;

    // lostCost ($/month) = income * trips per day * days worked in a week
    // * weeks in a month * transit time in hours
    let lostCost = state.income * state.daysPerWeek * 4 * 2 * startTravelTime;

    // gasCost ($/month)=  distance(miles) / mpg * last weeks' avg gas cost
    // * trips per day * days worked in a week * weeks in a month
    let gasCost =
      (distance / state.mpg) *
      state.gas[2]['regular'] *
      2 *
      state.daysPerWeek *
      4;

    // create new Result with title as home address
    result = new Result(state.suggestedLocations[i]);
    result.dest = state.remoteAddr;

    // add new Cost to array of result.costs
    let opCostTooltip =
      'Opportunity cost is the loss of potential gain from other alternatives' +
      'when one alternative is chosen. In this case, it is the wages you' +
      'could earn if you were working instead of commuting';
    result.addCost('Lost Cost', lostCost, '-', opCostTooltip);
    result.addCost('Gas Cost', gasCost, '-');
    result.tooltip;

    // set result body message
    result.body = `You lose $${lostCost.toFixed(
      2
    )} in opportunity cost a month. You spend $${gasCost.toFixed(
      2
    )} a month on gas.`;

    // set all result costs to precision of 2
    result.setPrecision(2);

    results.push(result);
  });

  return results;
}

module.exports = { calculate, calculateSuggestion };
