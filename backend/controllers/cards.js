const Card = require('../models/card');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => customError(res, 500, 'An error occured'));
};

const createCard = (req, res) => {
  const { name, link} = req.body;
  const { _id } = req.user;
  Card.create({
    name,
    link,
    owner: _id,
  })
  .then((card) => {
      if (!card) {
        throw new BadRequestError('Bad request');
      }
      console.log(req.body);
      res.status(201).send({ data: card });
    })
    .catch(next);
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
