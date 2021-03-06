const axios = require('axios');
const cheerio = require('cheerio');
const states = require('../lib/USstates');

/**
 * Scrape gas prices from American Automobile Association website by state
 * and major county.
 *
 * @param {String} state State abbreviation, ie 'CA'
 * @return {Promise} array of {
 *                              state,
 *                              county,
 *                              prices: [{avgType,
 *                                        regular,
 *                                        mid,
 *                                        premium,
 *                                        diesel
 *                                      }]
 *                              }
 */
async function gasPricesByState(state) {
  return new Promise(async (resolve, reject) => {
    const url = 'https://gasprices.aaa.com';
    let countyIndex = 0;
    let labels = ['avgType', 'regular', 'mid', 'premium', 'diesel'],
      counties = [],
      result = [];

    // check for valid state
    state = state.toUpperCase();
    if (!states.hasOwnProperty(state))
      reject(`gasPricesByCounty fail: invalid state`);

    try {
      const { data } = await axios.get(url, { params: { state: state } });

      const $ = cheerio.load(data);

      // find table index for county
      counties.push('State Average');
      $('h3').each((i, el) => counties.push($(el).text()));

      // scrape table by countyIndex
      $('.table-mob tbody').each((i, tbody) => {
        let item = { state: state, county: counties[i], prices: [] };

        $(tbody)
          .find('tr')
          .each((j, tr) => {
            let record = {};

            $(tr)
              .find('td')
              .each((k, td) => {
                let value = Number(
                  $(td)
                    .text()
                    .replace(/[$,]+/g, '')
                );

                record[labels[k]] = isNaN(value) ? $(td).text() : value;
              });

            item.prices.push(record);
          });

        result.push(item);
      });

      resolve(result);
    } catch (e) {
      reject(`gasPricesByState fail: ${e}`);
    }
  });
}

/**
 * Scrape gas prices from American Automobile Association website by state
 * and major county. If no county or invalid county, then defaults to state
 * average. Reject on invalid state.
 *
 * @param {String} state State abbreviation, ie 'CA'
 * @param {String} county Major county area, refer to aaa.com for list
 * @return {Promise} array of {avgType, regular, mid, premium, diesel}
 */
async function gasPricesByCounty(state, county = '') {
  return new Promise(async (resolve, reject) => {
    const url = 'https://gasprices.aaa.com';
    let countyIndex = 0;
    let labels = ['avgType', 'regular', 'mid', 'premium', 'diesel'],
      result = [];

    // check for valid state
    state = state.toUpperCase();
    if (!states.hasOwnProperty(state))
      reject(`gasPricesByCounty fail: invalid state`);

    try {
      const { data } = await axios.get(url, { params: { state: state } });

      const $ = cheerio.load(data);

      // find table index for county
      $('h3').each((i, el) => {
        if ($(el).text() == county) countyIndex = i + 1;
      });

      // scrape table by countyIndex
      $('.table-mob tbody')
        .eq(countyIndex)
        .find('tr')
        .each((i, tr) => {
          let record = {};

          $(tr)
            .find('td')
            .each((j, td) => {
              let value = Number(
                $(td)
                  .text()
                  .replace(/[$,]+/g, '')
              );

              record[labels[j]] = isNaN(value) ? $(td).text() : value;
            });

          result.push(record);
        });

      resolve(result);
    } catch (e) {
      reject(`gasPricesByCounty fail: ${e}`);
    }
  });
}

module.exports = { gasPricesByState, gasPricesByCounty, states };
