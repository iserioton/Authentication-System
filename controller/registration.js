function create_user(req, res, next) {
  next({
    status: 303,
    message: 'User created.',
    headers: {
      'Location': '/login'
    }
  })
}

module.exports = create_user;