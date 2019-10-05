import axios from 'axios';
import { googleGeocodingKey } from '../config/keys';

// return lat, lng coordinates from an address string
// @param addr - address string
// return Promise - resolve with {lat, lng}
//                  reject with error
async function googleGeocoder(addr) {
  return new Promise((resolve, reject) => {
    addr = 'address=' + addr.replace(/\s+/g, '+');
    let baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
    let keyStr = 'key=' + googleGeocodingKey;
    let getUrl = baseUrl + addr + '&' + keyStr;

    axios
      .get(getUrl)
      .then(res => resolve(res.data['results'][0]['geometry']['location']))
      .catch(e => reject(e));
  });
}

export default googleGeocoder;
