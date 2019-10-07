const axios = require('axios');

/**
 * Calculate the optimal cost
 *
 * @param {Object} state = {
 *                    homeAddr, remoteAddr, income, homeCost, workHours,
 *                    distance: { text, value },
 *                    duration: { text, value }
 *                    }
 * @return {Object} { lostCost, gasCost }
 */
function calculate(state) {
  const travelTime = state.duration.value;
  const distance = state.distance.value;

  //lost cost given as dollars per month such that lostCost =
  //    income * trips per day * days worked in a week * weeks in a month * transit time in hours
  const lostCost = state.income * 2 * 5 * 4 * (travelTime / 60 / 60);

  //TODO implement gasMilage, gascost

  const result = {
    lostCost: lostCost,
    gasCost: 'TODO'
  };

  return result;
}

module.exports = calculate;
