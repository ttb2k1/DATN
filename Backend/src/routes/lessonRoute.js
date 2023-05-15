const express = require('express');
const router = express.Router();

const { postLesson } = require('../controllers/lessonController');

router.post('/', postLesson);

module.exports = router;
