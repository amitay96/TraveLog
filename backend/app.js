const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
var cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { reqLimiter } = require("./middlewares/reqLimiter");
const { validateAuth } = require("./middlewares/validation");
require("dotenv").config();

const { PORT = 3000 } = process.env;
const { MONGODB_URI = "mongodb://localhost:27017/aroundb" } = process.env;

mongoose.connect(MONGODB_URI);

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(reqLimiter);
app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", validateAuth, createUser);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App initialised on port ${PORT}`);
});
