const jwt = require('jsonwebtoken');
const { customError } = require('../utils/errors');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(customError(res, 401, 'Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(customError(res, 401, 'Authorization required'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;