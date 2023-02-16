const path = require('path')
require('dotenv').config();
const express = require('express');
const cookie_parser = require('cookie-parser')
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const { handle_error, handle_sucess } = require('./middleware/response')

app.use(
  cookie_parser(process.env.COOCKIE_SECRET),
  express.json(),
  helmet()
);

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': ['*'],
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  next();
});

app.use(routes);

app.use((data, req, res, next) => {
  if (data instanceof Error) {
    /** Error handler - save log */
    handle_error(res, data);
  } else {
    /** Execution succesfully completed */
    handle_sucess(res, data.status, data.data, data.headers, data.message);
  }
})

app.use((req, res) => {
  res.status(404).send('Not Found!');
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

process.on('uncaughtException', err => {
  console.log('\nuncaughtException: ', err);
})

process.on('uncaughtExceptionMonitor', err => {
  console.log('\nuncaughtExceptionMonitor: ', err);
})

process.on('unhandledRejection', err => {
  console.log('\nunhandledRejection:', err);
})