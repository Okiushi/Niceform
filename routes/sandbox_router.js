const express = require('express');
const router = express.Router();
const sb = require('../controllers/sandbox_controller');

router.get('/', sb.displaySbHome);
router.get('/db', sb.displaySbDb);

module.exports = router;
