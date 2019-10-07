const axios = require('axios');
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const url = require('url');

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
 * Read all zillow files
 *
 * @param {Array} files Array of file names
 * @return {Promise} array of {file: path, pomona: rentValue}
 */
function readZillowData(files) {
  var results = [];

  files.forEach(file => {
    let data = fs.readFileSync(file, { encoding: 'utf8' });
    let jData = csvjson.toObject(data);

    let pomona = jData.filter(d => d['"RegionName"'] == 'Pomona')[0];

    // remove non year keys
    let removeKeys = [
      '"RegionName"',
      '"State"',
      '"Metro"',
      '"CountyName"',
      '"SizeRank"'
    ];
    removeKeys.forEach(key => delete pomona[key]);

    // get latest key
    let keys = Object.keys(pomona).reverse();

    // push rent value from latest key to results
    results.push({
      file: path.basename(file),
      pomona: Number(pomona[keys[0]])
    });
  });

  return results;
}

// download zillow files and parse them to get pomona rent for latest month
// return Promise - resolve with array of zillow rent data

/**
 * Download zillow files and parse them to get pomona rent for latest month
 *
 * @return {Promise} array of {file: path, pomona: rentValue}
 */
async function zillowRent() {
  const dir = 'resources';
  const baseUrl = 'http://files.zillowstatic.com/research/public/City/';
  const files = [
    'City_MedianRentalPrice_1Bedroom.csv',
    'City_MedianRentalPrice_2Bedroom.csv'
  ];

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
      .then(files => resolve(readZillowData(files)))
      .catch(e => reject(e));
  });
}

module.exports = zillowRent;
