const mongoose = require('mongoose');

// RentPrice schema
let rentPriceSchema = mongoose.Schema({
  state: { type: String, required: true },
  city: { type: String, required: true },
  metro: { type: String, required: true },
  county: { type: String, required: true },
  date: { type: String, required: true },
  prices: {
    '1Bedroom': { type: Number, required: true },
    '2Bedroom': { type: Number, required: false },
    '3Bedroom': { type: Number, required: false },
    Studio: { type: Number, required: false },
    Sfr: { type: Number, required: false }
  }
});

let RentPrice = (module.exports = mongoose.model('RentPrice', rentPriceSchema));
