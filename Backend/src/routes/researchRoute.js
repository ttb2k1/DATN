const express = require('express');
const router = express.Router();

const { getVocab } = require('../controllers/researchController');

router.post('/reserach', getVocab);

module.exports = router;
