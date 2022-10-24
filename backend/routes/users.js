const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  getUserbyId,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");
const {
  validateProfile,
  validateId,
  validateAvatar,
} = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.get("/:id", validateId, getUserbyId);
router.get("/", getUsers);
router.patch("/:id", validateProfile, updateUserInfo);
router.patch("/:id/avatar", validateAvatar, updateUserAvatar);

module.exports = { usersRouter: router };
