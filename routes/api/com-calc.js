const cheerio = require('cheerio'); // scraper
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
    remoteAddr: req.body.remoteAddr,
    income: req.body.income,
    homeCost: req.body.homeCost,
    workHours: req.body.workHours
  };

  // mockup for scraping webpages for data
  html_data = '<html op="news"><head><title>Mockup data for title</title></head><body>Mockup data for body</body></html>';
  const $ = cheerio.load(html_data);
  console.log('This is the title from raw html:', $('title').text());

  console.log('\nServer received post request at /api/com-calc');
  console.log('data:', state);
  console.log('Server ending back response');
  feedback = {
    optimalCost: 'GOOD TO COMMUTE'
  };
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
