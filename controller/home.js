function home(req, res, next) {
  next({
    status: 200,
    data: { 'message': `Your email is ${res.user.email}.` }
  })
}
module.exports = home;