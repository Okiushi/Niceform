const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth_controller');

// Connection routes
router.post('/login', auth.login); // login a user
router.post('/logout', auth.logout); // logout a user

// User routes

module.exports = router;
