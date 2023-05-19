const Research = require('../models/researchModel');
const { createCanvas, loadImage } = require('canvas');
const xlsx = require('xlsx');
const tf = require('@tensorflow/tfjs');
const tfn = require('@tensorflow/tfjs-node');
const handler = tfn.io.fileSystem('src/configs/model.json');
const KANJI_CLASSES = require('../configs/kanjiclass');
const TOP_K = 7;

const researchService = {
  getVocabBySearch: async (data) => {
    console.log(data);
    const result = await Research.find({
      $or: [
        { vocabulary: { $regex: data, $options: 'i' } },
        { hiragana: { $regex: data, $options: 'i' } },
        { compound: { $regex: data, $options: 'i' } },
        { mean: { $regex: data, $options: 'i' } },
      ],
    });
    return result;
  },

  postFileExcel: async () => {
    return true;
  },

  getVocabByStroke: async (imagePath) => {
    const img = await loadImage(imagePath);

    const canvas = createCanvas(150, 150);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 150, 150);

    let tensor = tf.browser
      .fromPixels(canvas) // .fromPixels(image)
      .resizeNearestNeighbor([96, 96])
      .expandDims()
      .toFloat();
    tensor = tensor.div(255);

    // console.log(tensor);
    var model = await tf.loadLayersModel(handler);
    let predictions = await model.predict(tensor).dataSync();
    var top_K = Array.from(predictions)
      .map(function (p, i) {
        return {
          probability: p,
          className: KANJI_CLASSES[i],
        };
      })
      .sort(function (a, b) {
        return b.probability - a.probability;
      })
      .slice(0, TOP_K);
    return top_K;
  },
};

module.exports = researchService;
