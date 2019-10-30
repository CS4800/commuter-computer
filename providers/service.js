const schedule = require('node-schedule');
const gasPriceUpdate = require('../database/gasPriceUpdate');
const rentPriceUpdate = require('../database/rentPriceUpate');

/**
 * Provide all services for server
 *
 * @return none
 */
async function run() {
  // run first instance of jobs
  gasPriceUpdate();
  rentPriceUpdate();

  // set recurrence rule on Sunday midnight
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0];
  rule.hour = 0;
  rule.minute = 0;

  // schedule recurrent job
  schedule.scheduleJob(rule, function() {
    console.log(`Running scheduled jobs...on ${new Date()}`);

    gasPriceUpdate();
    rentPriceUpdate();
  });
}

module.exports = { run };
