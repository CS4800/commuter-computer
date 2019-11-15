const mongoose = require('mongoose');

// CityDistance schema
let cityDistanceModel = mongoose.Schema({
  state: { type: String, required: true },
  city: { type: String, required: true },
  county: { type: String, required: true },
  distances: [{ city: String, distance: Number }] //array of Cities ordered by least to greatest distance
});

let CityDistance = (module.exports = mongoose.model(
  'CityDistance',
  cityDistanceModel
));
