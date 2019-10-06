const express = require('express');
const router = express.Router();

// @route   GET api/default
// @desc    Example get route
// @access  Public
router.get('/', (req, res) => {
  // dummy data to return to get requester
  // array of json objects
  const getData = [
    {
      name: 'Test data 1',
      id: 1
    },
    {
      name: 'Test data 2',
      id: 12
    }
  ];

  res.json(getData);
});

// @route   POST api/default
// @desc    Example post route
// @access  Public
router.post('/', (req, res) => {
  state = {
    homeAddr: req.body.homeAddr,
    homeCoord: req.body.homeCoord,
    remoteAddr: req.body.remoteAddr,
    remoteCoord: req.body.remoteCoord,
    income: req.body.income,
    homeCost: req.body.homeCost,
    workHours: req.body.workHours
  };

  console.log('\nServer received post request at /api/com-calc');
  console.log('post data:\n', state);

  feedback = {
    optimalCost: 'GOOD TO COMMUTE'
  };

  console.log('Server sending back response');
  res.json(feedback);
});

// @route   DELETE api/default
// @desc    Example delete route
// @access  Public
router.delete('/:name&:id', (req, res) => {
  res.json({
    name: req.params.name,
    id: req.params.id
  });
});

module.exports = router;
