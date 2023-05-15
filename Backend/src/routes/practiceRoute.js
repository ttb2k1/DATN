const express = require('express');
const router = express.Router();

const { getListLesson } = require('../controllers/practiceController');

router.get('/listLesson', getListLesson);

module.exports = router;
