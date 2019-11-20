const express = require('express');
const router = express.Router();

// team members for Baseball Caps
const users = [
  {
    name: 'Kevin Young',
    title: 'Backend developer',
    description: 'Nodejs backend development and calculation logic'
  },
  {
    name: 'Michael Ackerman',
    title: 'Devop',
    description: 'Amazon aws, continous integration, and testing'
  },

  {
    name: 'Thuan Tang',
    title: 'Fullstack',
    description: 'ReactJS frontend with Nodejs setup'
  },
  {
    name: 'Youngjun Woo',
    title: 'Database and business',
    description: 'Mongo database and QoS improvements'
  }
];

// @route   GET api/default
// @desc    returns all users in this project
// @access  Public
router.get('/', (req, res) => {
  res.json(users);
});

// @route   GET api
// @desc    return specific user: thuan
// @access  Public
router.get('/thuan', (req, res) => {
  let user = users.find(u => u['name'] == 'Thuan Tang');
  res.json(user);
});

// @route   GET api
// @desc    return specific user: mac
// @access  Public
router.get('/mac', (req, res) => {
  let user = users.find(u => u['name'] == 'Michael Ackerman');
  res.json(user);
});

// @route   GET api
// @desc    return specific user: mac
// @access  Public
router.get('/kevin', (req, res) => {
  let user = users.find(u => u['name'] == 'Kevin Young');
  res.json(user);
});

// @route   GET api
// @desc    return specific user: kevin
// @access  Public
router.get('/youngjun', (req, res) => {
  let user = users.find(u => u['name'] == 'Youngjun Woo');
  res.json(user);
});

module.exports = router;
