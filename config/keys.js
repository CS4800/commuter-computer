// set server keys here
module.exports = {
  mongoURI: process.env.MONGOURI || '',
  googleDistanceMatrixKey: process.env.DIST_MATRIX_KEY || '',
  googleGeocodingKey: process.env.GEOCODING_KEY || '',
};
