const axios = require('axios');
const { distanceAPI } = require('../../config/keys');

//@param - state = { homeAddr, homeCoord, remoteAddr, remoteCoord, income, homeCost, workHours}
//return promise - resolve with
//  { lostCost, gasCost } 
async function calculate(state)
{
   
   return  new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

    axios
      .get(url, {
            params: 
            { 
               origins: state.homeAddr, 
               destinations: state.remoteAddr,
               key: distanceAPI 
            }})
      .then(res => {

          const travelTime = res.data['rows'][0]['elements'][0].duration.value
          const distance = res.data['rows'][0]['elements'][0].distance.value
          //lost cost given as dollars per month such that lostCost = 
          //    income * trips per day * days worked in a week * weeks in a month * transit time in hours
          const lostCost = state.income * 2 * 5 * 4* (travelTime/60/60);
          //TODO implement gasMilage gascost
          feedback ={
              lostCost: lostCost,
              gasCost: "TODO"
          }
          resolve(feedback)
      })
      .catch(e => reject(`Failed:  ${e}`));
  });
}
module.exports = calculate;