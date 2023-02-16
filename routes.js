const login = require('./controller/login');
const create_user = require('./controller/registration');
const home = require('./controller/home');
const logout = require('./controller/logout');
const middies = require('./middleware');

const Router = require('express').Router();

Router.put('/login', ...middies.validation.login_validation(), login);
Router.put('/log-out', logout);
Router.post('/create-user', ...middies.validation.new_user_validation(), create_user);

Router.get('/home', middies.validation.verify_request, home);

module.exports = Router;