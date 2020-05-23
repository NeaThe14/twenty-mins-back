const express = require('express');
const router = express.Router();
const userSchema = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

router.post('/register', async (req, res) => {
  const { name, email, pwd, pwd2 } = req.body;

  try {
    // const newUser = await new userSchema({ name, email, pwd, pwd2 });

    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(newUser.pwd, salt, (err, hash) => {
    //     if (err) throw err;

    //     newUser.pwd = hash;
    //     newUser.save();
    //   });
    // });

    const newUser = await userSchema.findOne({ email: email }).then((user) => {
      if (user) {
        res.sendStatus(400).json({ msg: 'user already exists' });
      } else {
        const User = new userSchema({
          name,
          email,
          pwd,
          pwd2,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(User.pwd, salt, (err, hash) => {
            if (err) console.log(err);
            User.pwd = hash;
            // res.sendStatus(200).json({ msg: 'Success', data: User });
            User.save().then((user) => {
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    user: user,
                    token,
                  });
                }
              );
            });
          });
        });
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((val) => val.message);
      console.log(message);
      res.status(500).json({ success: false, err: message });
    }
  }
});

module.exports = router;
