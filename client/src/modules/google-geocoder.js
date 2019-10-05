import axios from 'axios';
import { googleGeocodingKey } from '../config/keys';

// return GPS coordinates from an address string
// @param addr - address string
// return Promise - resolve with {lat, lng}
async function googleGeocoder(addr) {
  return new Promise((resolve, reject) => {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json';

    axios
      .get(url, { params: { address: addr, key: googleGeocodingKey } })
      .then(res => resolve(res.data['results'][0]['geometry']['location']))
      .catch(e => reject(`Failed to get geocode [${addr}]: ${e}`));
  });
}

export default googleGeocoder;
