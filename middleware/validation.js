const { body, validationResult, query } = require('express-validator');
const { verify_token } = require('../helper/outh-functions');

function login_validation() {
  return [
    query('email').isEmail(),
    query('password').isLength({ min: 5 }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
}

function new_user_validation() {
  return [
    body('email').trim().isEmail().withMessage('Email must be an valid email.'),
    body('password').trim().isLength({ min: 5, max: 20 }).withMessage('Password must be between 5 to 30 characters'),
    body('confirm_password').trim().isLength({ min: 5, max: 20 }).custom(async (confirmPassword, { req }) => {
      const password = req.body.password
      if (password !== confirmPassword) {
        throw new Error('Passwords must be same')
      }
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ]
}

function verify_request(req, res, next) {
  let token = req.signedCookies.token;
  if (token) {
    let data = verify_token(token);
    res.user = {
      userid: data.userid,
      email: data.email
    }
    next();
  } else {
    next({
      status: 303,
      message: 'Unauthorized.',
      headers: {
        'Location': '/login'
      }
    })
  }
}

module.exports = {
  login_validation,
  new_user_validation,
  verify_request
}