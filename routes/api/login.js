const express = require('express');
const router = express.Router();
const userSchema = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {});

module.exports = router;
