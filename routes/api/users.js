const express = require('express');
const router = express.Router();

// team members for Baseball Caps
const users = [
  {
    name: 'Thuan Tang',
    description: 'Team member of Baseball Caps for CS4800'
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

module.exports = router;
