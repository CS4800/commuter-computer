const axios = require('axios');
const {
  googleDistanceMatrixKey,
  googleGeocodingKey,
  googleTimeZoneKey
} = require('../config/keys');

/**
 * Get distance between two address, optionally with arrival time
 *
 * @param {String} beginAddr Starting address
 * @param {String} endAddr Destination address
 * @param {Number} departure_time Departure time seconds since epoch
 * @return {Promise} {
 *                    destination_addresses,
 *                    origin_addresses,
 *                    matrices: [{ distances, duration, status }]
 *                   }
 */
function distanceMatrix(beginAddr, endAddr, departure_time) {
  return new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    let response = { matrices: [] };

    axios
      .get(url, {
        params: {
          origins: beginAddr,
          destinations: endAddr,
          departure_time: departure_time,
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

/**
 * Get Time Zone from address
 *
 * @param {String} addr Address
 * @return {Promise} { dstOffset, rawOffset, status, timeZoneId, timeZoneName }
 */
function timezone(lat, lng, timestamp = Math.round(Date.now() / 1000)) {
  return new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/timezone/json';

    axios
      .get(url, {
        params: {
          location: `${lat},${lng}`,
          timestamp: timestamp,
          key: googleTimeZoneKey
        }
      })
      .then(res => resolve(res.data))
      .catch(e => reject(`geocoder fail: ${e}`));
  });
}

module.exports = { distanceMatrix, geocoder, timezone };
