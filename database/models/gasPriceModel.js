const mongoose = require('mongoose');

// GasPrice schema
let gasSchema = mongoose.Schema({
  state: { type: String, required: true },
  county: { type: String, required: true },
  prices: [
    {
      avgType: { type: String, required: true },
      regular: { type: Number, required: true },
      mid: { type: Number, required: true },
      premium: { type: Number, required: true },
      diesel: { type: Number, required: true },
      e85: { type: Number, required: false }
    }
  ]
});

let GasPrice = (module.exports = mongoose.model('GasPrice', gasSchema));
