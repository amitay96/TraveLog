const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  validateId,
  validateCard,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateId, deleteCard);
router.put('/:id/likes', validateId, likeCard);
router.delete('/:id/likes', validateId, dislikeCard);

module.exports = { cardsRouter: router };
