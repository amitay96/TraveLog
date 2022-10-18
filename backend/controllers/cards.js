const Card = require('../models/card');
const { customError } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => customError(res, 500, 'An error occured'));
};

const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const { _id } = req.user;
  Card.create({
    name,
    link,
    likes,
    owner: _id,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
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

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndRemove(id)
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ message: 'Card removed successfully', data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Invalid card id');
      } else if (err.statusCode === 404) {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'An error occured on the server');
      }
    });
};

const updateLike = (req, res, method) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('No card found for the specified id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, 400, 'Invalid card id');
      } else if (err.statusCode === 404) {
        customError(res, 404, err.message);
      } else {
        customError(res, 500, 'An error occured');
      }
    });
};

const likeCard = (req, res) => updateLike(req, res, '$addToSet');

const dislikeCard = (req, res) => updateLike(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
