const express = require('express');
const router = express.Router();
const user = require('../controllers/api_controller/user_controller');

router.post('/user', user.createUser); // create a new user
router.get('/users', user.getAllUsers); // get all users
router.get('/user/:id', user.getUser); // get a user
router.put('/user/:id', user.update); // update a user
router.delete('/user/:id', user.deleteUser); // delete a user

module.exports = router;
