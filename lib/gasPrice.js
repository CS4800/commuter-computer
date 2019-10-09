const axios = require('axios');
const cheerio = require('cheerio');

const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};

/**
 * Scrape gas prices from American Automobile Association website by state
 * and major county. If no county or invalid county, then defaults to state
 * average. Reject on invalid state.
 *
 * @param {String} state State abbreviation, ie 'CA'
 * @param {String} county Major county area, refer to aaa.com for list
 * @return {Promise} array of {avgType, regular, mid, premium, diesel}
 */
async function gasPrices(state, county) {
  return new Promise(async (resolve, reject) => {
    const url = 'https://gasprices.aaa.com';
    let countyIndex = 0;
    let labels = ['avgType', 'regular', 'mid', 'premium', 'diesel'],
      gas = [];

    // check for valid state
    state = state.toUpperCase();
    if (!states.hasOwnProperty(state)) reject(`gasPrices fail: invalid state`);

    // check for county
    if (!county) county = '';

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

          gas.push(record);
        });

      resolve(gas);
    } catch (e) {
      reject(`gasPrices fail: ${e}`);
    }
  });
}

module.exports = gasPrices;
