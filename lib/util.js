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

module.exports = { timeToSeconds, timeDiffSeconds, timeToArray };
