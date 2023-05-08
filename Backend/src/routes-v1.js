const express = require('express');
const router = express.Router();

router.use('/listKanji', require('./routes/kanjiRoute'));

router.use('/practice', require('./routes/practiceRoute'));

module.exports = router;
