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
  const travelTime = state.duration.value / 60 / 60;
  const distance = state.distance.value * 0.000621371;

  //lost cost given as dollars per month such that lostCost =
  //    income * trips per day * days worked in a week * weeks in a month * transit time in hours
  const lostCost = state.income * 2 * state.daysPerWeek * 4 * travelTime;

  //gasCost given as dollars per month such that gasCost =
  //    distance(miles) / mpg * last weeks' avg gas cost * trips per day * days worked in a week * weeks in a month 
  const gasCost = (distance / state.mpg) * state.gas[2]['regular'] * 2 * state.daysPerWeek * 4;
  
  const result = {
    lostCost: lostCost,
    gasCost: gasCost
  };
  console.log(result);
  return result;
}

module.exports = calculate;
