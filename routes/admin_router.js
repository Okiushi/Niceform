const express = require('express');
const router = express.Router();
const display = require('../controllers/admin_controller');

router.get('/', display.home);
router.get('/user', display.user);

module.exports = router;
