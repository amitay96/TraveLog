const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { customError } = require('../utils/errors');

const { JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.send({ data: user.toJSON(), token });
  })
  .catch((err) => {
    next(customError(res, 401, "Email or Password incorrect"));
  });
};
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => customError(res, 500, 'An error occured'));
};

const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error('User Not Found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Invalid user id');
      } else if (err.statusCode === 404) {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'An error occured on the server');
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        throw new customError(res, 409, 'Email already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then(hash => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(201).send({ data: user }))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        customError(res, 500, 'An error occured on the server');
      }
    });
};

const updateUserData = (req, res) => {
  const id = req.user._id;
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Invalid user id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Invalid user id');
      } else if (err.statusCode === 404) {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'An error occured on the server');
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return customError(
      res,
      400,
      'Both name and about fields are required, please update',
    );
  }
  return updateUserData(req, res);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return customError(res, 400, 'Avatar new URL link is required');
  }
  return updateUserData(req, res);
};

module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
