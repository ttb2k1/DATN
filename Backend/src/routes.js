const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome TEST API',
  });
});

router.use('/api/v1/practice', require('./routes/practiceRoute'));
router.use('/api/v1/listKanji', require('./routes/kanjiRoute'));
router.use('/api/v1/lesson', require('./routes/lessonRoute'));
router.use('/api/v1/research', require('./routes/researchRoute'));

module.exports = router;
