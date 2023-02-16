const { create_token } = require('../helper/outh-functions');

function login(req, res, next) {
  let { email, password } = req.query;

  let data = {
    userid: 1,
    email
  };

  let token = create_token(data, '24h');
  res.cookie('token', token, {
    maxAge: 1000 * 60 * 60 * 24, //24h
    httpOnly: true,
    signed: true,
    sameSite: true,
    secure: false,
    priority: 'high',
    secret: process.env.COOCKIE_SECRET
  })

  next({
    status: 303,
    message: 'User loged in.',
    headers: {
      'Location': '/home'
    }
  })

}

module.exports = login;