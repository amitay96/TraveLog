const router = require('express').Router();
const {
  getUsers,
  getUserbyId,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserbyId);
router.get('/me', getCurrentUser);
router.patch('/:id', updateUserInfo);
router.patch('/:id/avatar', updateUserAvatar);

module.exports = { usersRouter: router };
