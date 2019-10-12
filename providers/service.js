const nodeSchedule = require('node-schedule');
const gasPriceUpdate = require('../database/gasPriceUpdate');
const rentPriceUpdate = require('../database/rentPriceUpate');

/**
 * Provide all services for server
 *
 * @return none
 */
async function run() {
  // schedule model update jobs; will run once on schedule
  nodeSchedule.scheduleJob('0', gasPriceUpdate());
  nodeSchedule.scheduleJob('0', rentPriceUpdate());
}

module.exports = { run };
