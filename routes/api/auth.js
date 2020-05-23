const express = require('express');
const router = express.Router();
const User = require(`../../models/User`);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');

router.post('/auth', (req, res) => {
  const { email, pwd, name } = req.body;

  // if (!email || !pwd) {
  //   return res.status(400).json({ msg: 'No fields' });
  // }

  User.findOne({ email: email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'No user' });

    bcrypt.compare(pwd, user.pwd).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrect password' });
      }

      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'));
      console.log(token);
      res.json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          pwd: user.pwd,
        },
        token,
      });
    });
  });
});

router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.json(false);

    const verified = jwt.verify(token, config.get('jwtSecret'));
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/authenticate', auth, async (req, res) => {
  const user = await User.findById(req.user);
  console.log(user._id);
  res.json({
    id: user._id,
    user: { name: user.name, email: user.email, pwd: user.pwd },
  });
});

module.exports = router;
