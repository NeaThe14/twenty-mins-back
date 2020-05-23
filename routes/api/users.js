const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/User');

router.get('/users', (req, res) => {
  const users = User.find({}).then((user) => {
    if (user) {
      res.json(user);
    }
  });
});

module.exports = router;
