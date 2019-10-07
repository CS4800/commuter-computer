const express = require('express');
const router = express.Router();
const comCalcController = require('../../controllers/comCalcController');

// @route   POST api/default
// @desc    Commuter Calculator for optimal cost
// @access  Public
router.post('/', (req, res) => {
  comCalcController.post(req, res);
});

module.exports = router;
