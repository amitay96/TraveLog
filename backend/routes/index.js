const router = require("express").Router();
const { usersRouter } = require("./users");
const { cardsRouter } = require("./cards");
const auth = require("../middlewares/auth");
const NotFoundError = require("../utils/errors/NotFoundError");

router.use(auth);

router.use("/users", usersRouter);

router.use("/cards", cardsRouter);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
