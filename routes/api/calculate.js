const axios = require('axios');
const { distanceAPI } = require('../../config/keys');

//@param - state = { homeAddr, homeCoord, remoteAddr, remoteCoord, income, homeCost, workHours}
//@param - data = { distance: { text, value }, duration: { text, value }, status }
//return promise - resolve with
//  { lostCost, gasCost } 
function calculate(state, data)
{
    const travelTime =data.duration.value;
    const distance = data.distance.value;
    //lost cost given as dollars per month such that lostCost = 
    //    income * trips per day * days worked in a week * weeks in a month * transit time in hours
    const lostCost = state.income * 2 * 5 * 4* (travelTime/60/60);
    //TODO implement gasMilage, gascost
    const result = {
        lostCost: lostCost,
        gasCost: "TODO"
    };
   return result;
}
module.exports = calculate;