const express = require('express');
const router = express.Router();
let GasPrice = require('../../database/models/gasPriceModel');
let RentPrice = require('../../database/models/rentPriceModel');

// @route   GET api/default
// @desc    returns all mongodb collections
// @access  Public
router.get('/', async (req, res) => {
  let response = {};

  response['gases'] = await GasPrice.find({});
  response['rents'] = await RentPrice.find({});

  res.json(response);
});

// @route   GET api
// @desc    return mongodb's collection: gasPrices
// @access  Public
router.get('/gases', async (req, res) => {
  let gases = await GasPrice.find({});
  res.json(gases);
});

// @route   GET api
// @desc    return mongodb's collection: rentPrices
// @access  Public
router.get('/rents', async (req, res) => {
  let rents = await RentPrice.find({});
  res.json(rents);
});

module.exports = router;
