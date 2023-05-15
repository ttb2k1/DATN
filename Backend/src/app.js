const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The server is running on PORT:${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

const modelPath = path.resolve(__dirname, 'configs', 'model.js');
const handler = tf.io.fileSystem(modelPath);
const loadModel = async () => {
  await tf.loadLayersModel(handler);
};

loadModel();

app.use('/', require('./routes'));

module.exports = app;
