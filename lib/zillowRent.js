const axios = require('axios');
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const url = require('url');
const states = require('../lib/USstates');

// zillow filenames to scrape
const zillowFiles = [
  'City_MedianRentalPrice_1Bedroom.csv',
  'City_MedianRentalPrice_2Bedroom.csv',
  'City_MedianRentalPrice_3Bedroom.csv',
  'City_MedianRentalPrice_Studio.csv',
  'City_MedianRentalPrice_Sfr.csv'
];

/**
 * Download zillow rent files to file system
 *
 * @param {String} url Download address
 * @param {String} fpath File path
 * @return {Promise} file path of downloaded file
 */
function dlZillowRentalCSV(url, fpath) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        fs.writeFileSync(fpath, res.data);
        resolve(fpath);
      })
      .catch(e => reject(`zillowRentalCSV fail [${url}]: ${e}`));
  });
}

/**
 * Read all csv files by state
 *
 * @param {Array} files Array of file names
 * @param {String} state State abbreviation, ie 'CA'
 * @return {Promise} array of { state, city, metro, county, date, prices }
 */
function readZillowData(files, state) {
  var results = [];

  files.forEach(file => {
    // read csv file and convert to json
    let data = fs.readFileSync(file, { encoding: 'utf8' });
    let jData = csvjson.toObject(data);

    // check for valid state
    state = state.toUpperCase();
    if (!states.hasOwnProperty(state))
      reject(`gasPricesByCounty fail: invalid state`);

    // filter data by state
    let records = jData.filter(d => d['"State"'] === state);

    // get latest key
    let keys = Object.keys(records[0]);
    let latestKey = keys[keys.length - 1];

    // get file type
    let fname = path.basename(file);
    let priceType = fname.substring(
      fname.lastIndexOf('_') + 1,
      fname.lastIndexOf('.')
    );

    // add record data to results
    for (record of records) {
      let rent = Number(record[latestKey]);

      let find = results.find(
        r =>
          r.city == record['"RegionName"'] &&
          r.metro == record['"Metro"'] &&
          r.county == record['"CountyName"']
      );

      if (find) {
        find.prices[priceType] = rent;
      } else
        results.push({
          state: state,
          city: record['"RegionName"'],
          metro: record['"Metro"'],
          county: record['"CountyName"'],
          date: latestKey.replace(/["]+/g, ''),
          prices: { [priceType]: rent }
        });
    }
  });

  return results;
}

/**
 * Download zillow files and scrape data for latest Median rent by state
 * 
 * @param {String} state State abbreviation, ie 'CA'
 * @param {Array} files Array of file names. Default zillowFiles
 * @return {Promise} array of { state, city, metro, county, date, prices }
 */
async function zillowRent(state, files = zillowFiles) {
  const dir = 'resources';
  const baseUrl = 'http://files.zillowstatic.com/research/public/City/';

  // create 'resources' directory if not exist
  if (!fs.existsSync(path.join(__dirname, dir)))
    fs.mkdirSync(path.join(__dirname, dir));

  // create url and file paths array
  const downloads = files.map(f => ({
    path: path.join(__dirname, dir, f),
    url: url.resolve(baseUrl, f)
  }));

  // download all Zillow CSV
  return new Promise((resolve, reject) => {
    Promise.all(downloads.map(dl => dlZillowRentalCSV(dl['url'], dl['path'])))
      .then(files => resolve(readZillowData(files, state)))
      .catch(e => reject(e));
  });
}

module.exports = zillowRent;
