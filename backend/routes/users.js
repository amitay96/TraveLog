const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserbyId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.get('/:id', getUserbyId);
router.patch('/:id', updateUserInfo);
router.patch('/:id/avatar', updateUserAvatar);

module.exports = { usersRouter: router };
