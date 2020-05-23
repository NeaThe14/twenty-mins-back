const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) res.status(401).json({ msg: 'Denied' });

  const verified = jwt.verify(token, config.get('jwtSecret'));

  try {
    req.user = verified.id;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
