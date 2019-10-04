const axios = require('axios');
const csvjson = require('csvjson');
const fs = require('fs');
const path = require('path');
const url = require('url');

// download zillow rent files to file system
// @param url - url to download
// @param fpath - path of file to save to file system
// return Promise - resolve when successful download return file path,
//                  reject when fails
function dlZillowRentalCSV(url, fpath) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        fs.writeFileSync(fpath, res.data);
        resolve(fpath);
      })
      .catch(e => reject(`Failed to download Zillow data (${url}): ${e}`));
  });
}

// read all zillow files
// @param files - array of file path
// return results - array of {file: path, pomona: rentValue}
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
// return Promise - resolves with array of zillow rent data
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
    Promise.all(
      // wait for all downloads to finish
      downloads.map(download =>
        dlZillowRentalCSV(download['url'], download['path'])
      )
    )
      // read all zillow files and resolve with results from readZillowData
      .then(files => resolve(readZillowData(files)))
      .catch(e => reject(`Failed to get results: ${e}`));
  });
}

module.exports = zillowRent;
