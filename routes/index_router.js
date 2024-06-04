const express = require('express');
const router = express.Router();
const index = require('../controllers/index_controller');

router.get('/', index.displayIndex);

module.exports = router;
