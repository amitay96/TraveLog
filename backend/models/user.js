const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The "name" field must be filled in'],
      minlength: [2, 'The minimum length of the "name" field is 2'],
      maxlength: [30, 'The maximum length of the "name" field is 30'],
      default: 'Jacques Cousteau',
    },
    about: {
      type: String,
      required: [true, 'The "about" field must be filled in'],
      minlength: [2, 'The minimum length of the "about" field is 2'],
      maxlength: [30, 'The maximum length of the "about" field is 30'],
      default: 'Explorer',
    },
    avatar: {
      type: String,
      required: [true, 'The "avatar" field must be filled in'],
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'The "avatar" field must be a valid URL',
      },
    },
    email: {
      type: String,
      required: [true, 'The "email" field must be filled in'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'The "email" field must be a valid URL',
      },
    },
    password: {
      type: String,
      required: [true, 'The "password" field must be filled in'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('bad credentials'));
      }
      console.log(email, password);
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('bad credentials'));
      }
      return user;
    });
}

module.exports = mongoose.model('user', userSchema);
