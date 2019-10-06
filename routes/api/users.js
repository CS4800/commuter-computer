const express = require('express');
const router = express.Router();

// team members for Baseball Caps
const users = [
  {
    name: 'Thuan Tang',
    description: 'Team member of Baseball Caps for CS4800'
  },
  {
    name: 'Michael Ackerman',
    description: 'hi, im mac'
  },
  {
    name: 'Youngjun Woo',
    description: 'Hi, this is Youngjun Woo'
  },
  {
    name: 'Kevin Young',
    description: 'Member of team Baseball Caps'
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
