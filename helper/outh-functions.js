const jwt = require('jsonwebtoken');

function create_token(data, expire) {
  let need_expiration = expire ? { expiresIn: expire } : {};
  return jwt.sign(data, process.env.JWT_SECRET, need_expiration);
}

function verify_token(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  create_token,
  verify_token
}