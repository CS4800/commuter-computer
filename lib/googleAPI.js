const axios = require('axios');
const {
  googleDistanceMatrixKey,
  googleGeocodingKey
} = require('../config/keys');

/**
 * Get distance between two address, optionally with arrival time
 *
 * @param {String} beginAddr Starting address
 * @param {String} endAddr Destination address
 * @param {Date} arrivalTime Arrival time for destination
 * @return {Promise} {
 *                    distance: { text, value },
 *                    duration: { text, value },
 *                    status
 *                   }
 */
function distanceMatrix(beginAddr, endAddr, arrivalTime) {
  return new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    let response = { matrices: [] };

    if (!arrivalTime) arrivalTime = Date.now();

    axios
      .get(url, {
        params: {
          origins: beginAddr,
          destinations: endAddr,
          arrival_time: arrivalTime,
          key: googleDistanceMatrixKey
        }
      })
      .then(res => {
        res.data['rows'].forEach(row =>
          row['elements'].forEach(element => response['matrices'].push(element))
        );
        response['origin_addresses'] = res.data.origin_addresses;
        response['destination_addresses'] = res.data.destination_addresses;

        resolve(response);
      })
      .catch(e => reject(`distanceMatrix fail: ${e}`));
  });
}

/**
 * Get GPS coordinates from address
 *
 * @param {String} addr Address
 * @return {Promise} {lat, lng}
 */
function geocoder(addr) {
  return new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json';

    axios
      .get(url, { params: { address: addr, key: googleGeocodingKey } })
      .then(res => resolve(res.data['results'][0]['geometry']['location']))
      .catch(e => reject(`geocoder fail: ${e}`));
  });
}

module.exports = { distanceMatrix, geocoder };
