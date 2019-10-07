const axios = require('axios');
const { distanceAPI } = require('../../config/keys');

//@param - state = { homeAddr, homeCoord, remoteAddr, remoteCoord, income, homeCost, workHours}
//return promise - resolve with
//   { distance: { text, value }, duration: { text, value }, status } 
function getDistance(state)
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
          resolve(res.data['rows'][0]['elements'][0]);
      })
      .catch(e => reject(`Failed:  ${e}`));
  });
}
module.exports = getDistance;