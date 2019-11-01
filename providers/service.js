const schedule = require('node-schedule');
const dbUpdate = require('../database/migration/dbUpdate');

/**
 * Provide all services for server
 *
 * @return none
 */
async function run() {
  // run first instance of jobs
  dbUpdate();

  // set recurrence rule on Sunday midnight
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0];
  rule.hour = 0;
  rule.minute = 0;

  // schedule recurrent job
  schedule.scheduleJob(rule, () => {
    console.log(`Running scheduled jobs...on ${new Date()}`);

    dbUpdate();
  });
}

module.exports = { run };
