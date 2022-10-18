const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The "name" field must be filled in'],
      minlength: [1, 'The minimum length of the "name" field is 2'],
      maxlength: [30, 'The maximum length of the "name" field is 30'],
    },
    link: {
      type: String,
      required: [true, 'The "link" field must be filled in'],
      validate: {
        validator: (value) => validator.isURL(value),
        message: 'The "link" field must be a valid URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'The "Owner" field must be filled in.'],
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
