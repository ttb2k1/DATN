const express = require('express');

const router = express.Router();

const { getAddress } = require('./dashboard.controller');

router.get('/address/', getAddress);

module.exports = router;
