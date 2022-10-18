const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { login, createUser } = require('../controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6329cfef95bb405db1146474',
  };
  next();
});

mongoose.connect('mongodb://localhost:27017/aroundb');

app.post('/signin', login);
app.post('/signup', createUser); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App initialised on port ${PORT}`);
});
