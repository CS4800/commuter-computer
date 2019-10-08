const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrape gas prices from American Automobile Association website
 *
 * @param {String} state State abbreviation, ie 'CA'
 * @return {Promise} {avgType, regular, midGrade, premium, diesel}
 */
function gasPrices(state) {
  return new Promise((resolve, reject) => {
    const url = 'https://gasprices.aaa.com';
    const labels = ['avgType', 'regular', 'midGrade', 'premium', 'diesel'];
    let gas = {};

    axios
      .get(url, {
        params: {
          state: state.toUpperCase()
        }
      })
      .then(res => {
        // scrape current avg gas prices
        const $ = cheerio.load(res.data);
        const data = $('table.table-mob')
          .first()
          .find('tr:first-child')
          .eq(1)
          .children()
          .map(function(i, el) {
            return $(this).text();
          })
          .get();

        // map 'data' array to 'gas' json object with keys
        data.forEach((d, i) => (gas[labels[i]] = d));

        resolve(gas);
      })
      .catch(e => reject(`gasPrices fail: ${e}`));
  });
}

module.exports = gasPrices;
