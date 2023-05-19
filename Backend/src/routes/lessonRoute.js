const express = require('express');
const router = express.Router();

const lessonController = require('../controllers/lessonController');

router.post('/', lessonController.postLesson);

module.exports = router;
