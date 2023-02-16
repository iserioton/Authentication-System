module.exports = (req, res, next) => {
  res.clearCookie('token');
  next({
    status: 303,
    message: 'User loged out.',
    headers: {
      'Location': '/login'
    }
  })
}