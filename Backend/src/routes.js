const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome TEST API',
  });
});

router.use('/api/v1/practice', require('./routes/practiceRoute'));

module.exports = router;
