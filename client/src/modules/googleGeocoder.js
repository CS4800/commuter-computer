import axios from 'axios';
import { googleGeocodingKey } from '../config/keys';

/**
 * Get GPS coordinates from address
 *
 * @param {String} addr Address
 * @return {Promise} {lat, lng}
 */
async function googleGeocoder(addr) {
  return new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json';

    axios
      .get(url, { params: { address: addr, key: googleGeocodingKey } })
      .then(res => resolve(res.data['results'][0]['geometry']['location']))
      .catch(e => reject(`googleGeocoder fail [${addr}]: ${e}`));
  });
}

export default googleGeocoder;
