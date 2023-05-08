const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The server is running on PORT:${PORT}`);
});

const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(
      'mongodb+srv://ttb2k1:JHuz4xdIFNzujkSZ@datn.acipuxg.mongodb.net/'
    );
    console.log('Connect successfuly');
  } catch (error) {
    console.log(error);
  }
};

database();

app.use('/', require('./routes'));

module.exports = app;
