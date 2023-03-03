const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

dotenv.config();

const connect = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect('mongodb+srv://bao:123qwe@test-mongo.yhswzmx.mongodb.net/test-connect?retryWrites=true&w=majority')
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);
  }
});

connect()

app.use(morgan('tiny'));

app.get('/api', (req, res) => {
  return res.send('Hello world');
});

app.listen(process.env.PORT, () => {
  console.log(`Connected with localhost http://localhost:${process.env.PORT}`);
});
