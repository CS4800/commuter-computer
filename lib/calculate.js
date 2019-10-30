const axios = require('axios');

class Result {
  constructor(t) {
    this.title = t;
    this.body;
    this.costs = [];
    this.total = null;
  }
}

class Cost {
  constructor(n = 'Default', v = 0, s = '+') {
    this.name = n;
    this.value = v;
    this.status = s;
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
    let travelTime = matrix.duration_in_traffic
      ? matrix.duration_in_traffic.value / 60 / 60
      : matrix.duration.value / 60 / 60;
    let distance = matrix.distance.value * 0.000621371;

    //lost cost given as dollars per month such that lostCost =
    //    income * trips per day * days worked in a week * weeks in a month * transit time in hours
    let lostCost = state.income * 2 * state.daysPerWeek * 4 * travelTime;

    //gasCost given as dollars per month such that gasCost =
    //    distance(miles) / mpg * last weeks' avg gas cost * trips per day * days worked in a week * weeks in a month
    let gasCost =
      (distance / state.mpg) *
      state.gas[2]['regular'] *
      2 *
      state.daysPerWeek *
      4;

    result = new Result(state.homeAddresses[i]);
    result.costs.push(new Cost('Lost Cost', lostCost.toFixed(2), '+'));
    result.costs.push(new Cost('Gas Cost', gasCost.toFixed(2), '-'));
    result.body = `You lose $${lostCost.toFixed(
      2
    )} in opportunity cost a month. You spend $${gasCost.toFixed(
      2
    )} a month on gas.`;

    results.push(result);
  });

  return results;
}

module.exports = calculate;
