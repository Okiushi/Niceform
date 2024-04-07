const express = require('express');
const router = express.Router();
const {displayIndex} = require('../controllers/index_controller');

router.get('/', displayIndex);

module.exports = router;
