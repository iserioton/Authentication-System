function handle_sucess(res, status = 200, data = {}, headers = false, message = 'Success') {
  if (headers) {
    res.set(headers);
  }
  res.status(status);
  res.statusMessage = message;
  res.send(data);
  return true;
}

function handle_error(res, error = new Error('Internal Server Error')) {
  if (error.headers) {
    res.set(error.headers);
  }
  res.statusMessage = 'Internal Server Error';
  res.status(error.code || 500).send({ data: error.data, message: error.message });
  return true;
}

module.exports = {
  handle_error,
  handle_sucess
}