const express = require('express');
const router = express.Router();
const {displaySbHome, displaySbDb} = require('../controllers/sandbox_controller');

router.get('/', displaySbHome);
router.get('/db', displaySbDb);

module.exports = router;
