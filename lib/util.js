/**
 * Convert HH:mm:ss time format to seconds Number
 *
 * @param {String} time Format 'HH:mm:ss', ie '09:30:59
 * @return {Number} Of seconds
 */
function timeToSeconds(time) {
  let HHmmss = time.split(':');
  let fromHours = HHmmss[0] ? Number(HHmmss[0]) * 3600 : 0;
  let fromMinutes = HHmmss[1] ? Number(HHmmss[1]) * 60 : 0;
  let fromSeconds = HHmmss[2] ? Number(HHmmss[2]) : 0;

  return fromHours + fromMinutes + fromSeconds;
}

/**
 * Convert HH:mm:ss time format array of [HH, mm, ss]
 *
 * @param {String} time Format 'HH:mm:ss', ie '09:30:59
 * @return {Array} Of Number. Always length 3, [HH, mm, ss]
 */
function timeToArray(time) {
  let arr = [0, 0, 0];
  let HHmmss = time.split(':');

  HHmmss.forEach((t, i) => (arr[i] = Number(t)));

  return arr;
}

/**
 * Convert HH:mm:ss time format to seconds Number
 *
 * @param {String} t1 Time 1. Format 'HH:mm:ss', ie '09:30:59
 * @param {String} t2 Time 2. Format 'HH:mm:ss', ie '09:30:59
 * @return {Number} Of seconds
 */
function timeDiffSeconds(t1, t2) {
  return timeToSeconds(t1) - timeToSeconds(t2);
}

/**
 * Returns modulus in positive. Javascript's % returns negative
 *
 * @param {Number} n Dividend
 * @param {Number} m Divisor
 * @return {Number} result
 */
function mod(n, m) {
  return ((n % m) + m) % m;
}

/**
 * Get the previous day of the week
 *
 * @param {Number} day Day of the week from 0-6 (Sun to Sat)
 * @param {Date} date Reference date
 * @return {Date} Prevous day of the week at 7 am
 */
function getPrevDay(day = 0, date = new Date()) {
  let prevDay = new Date();

  if (date.getDay() == day) prevDay.setDate(date.getDate() - 7);
  else prevDay.setDate(date.getDate() - mod(date.getDay() - day, 7));

  return prevDay;
}

/**
 * Get the next day of the week
 *
 * @param {Number} day Day of the week from 0-6 (Sun to Sat)
 * @param {Date} date Reference date
 * @return {Date} Next day of the week at 7 am
 */
function getNextDay(day = 0, date = new Date()) {
  let nextDay = new Date();

  if (date.getDay() == day) nextDay.setDate(date.getDate() + 7);
  else nextDay.setDate(date.getDate() + mod(day - date.getDay(), 7));

  return nextDay;
}

/**
 * Convert a date with time format to time since epoch of January 1, 1970 UTC.
 *
 * @param {Date} date Date
 * @param {String} t_fmt Time format 'HH:mm:ss', ie '09:30:59
 * @return {Number} Time in milliseconds since epoch
 */
function getTimeSinceEpoch(date = new Date(), t_fmt = '00:00:00') {
  let t_arr = timeToArray(t_fmt);

  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    t_arr[0] + 8, // hours
    t_arr[1], // minutes
    t_arr[2], // seconds
    0 // millisec
  );
}

module.exports = {
  timeToSeconds,
  timeDiffSeconds,
  timeToArray,
  mod,
  getPrevDay,
  getNextDay,
  getTimeSinceEpoch
};
