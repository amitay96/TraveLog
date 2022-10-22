const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserbyId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const {
  validateId,
  validateProfile,
  validateAvatar,
} = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.get('/:id', validateId, getUserbyId);
router.patch('/:id', validateProfile, updateUserInfo);
router.patch('/:id/avatar', validateAvatar, updateUserAvatar);

module.exports = { usersRouter: router };
