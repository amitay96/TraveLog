const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link} = req.body;
  const { _id } = req.user;
  Card.create({
    name,
    link,
    owner: _id,
  })
  .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
  .orFail(() => {
    throw new NotFoundError('Card not found');
  })
  .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('You are not authorized to delete this card'));
      } else {
        Card.findByIdAndRemove(id).then((card) =>
        res.status(200).send({ message: 'Card removed successfully', data: card })
        );
      }
    })
    .catch(next);
};

const updateLike = (req, res, next, method) => {
  const { id } = req.params;
  
  Card.findByIdAndUpdate(
    id,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with this Id');
    })
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        next(new NotFoundError('No card found with this Id'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => updateLike(req, res, next, '$addToSet');

const dislikeCard = (req, res, next) => updateLike(req, res, next, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
