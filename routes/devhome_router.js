const express = require('express');
const router = express.Router();
const {displayDevHome} = require('../controllers/devhome_controller');

router.get('/', displayDevHome);

module.exports = router;
