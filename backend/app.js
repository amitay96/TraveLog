const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');
const errorHandler = require('./middleware/errorHandler');
const { login, createUser } = require('../controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(cors());
app.options('*', cors());

app.use(helmet());

app.post('/signin', login);
app.post('/signup', createUser); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App initialised on port ${PORT}`);
});
