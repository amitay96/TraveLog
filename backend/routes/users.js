const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', updateUserInfo);
router.patch('/:id/avatar', updateUserAvatar);

module.exports = { usersRouter: router };
