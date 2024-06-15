const express = require('express');
const router = express.Router();
const user = require('../controllers/api_controller/api_user_controller');
const form = require('../controllers/api_controller/api_form_controller');
const {auth} = require('../middleware/auth');

// User routes
router.post('/user', user.createUser); // create a new user
router.get('/user', auth, user.getUser); // get the current user
router.get('/user/:id', auth, user.getUser); // get a user
router.get('/users', auth, user.getAllUsers); // get all users
// router.put('/user/:id', user.update); // update a user
router.delete('/user/:id', auth, user.deleteUser); // delete a user

// Form routes
router.post('/form', auth, form.createForm); // create a new form
router.get('/form/:id', auth, form.getForm); // get a form
router.get('/forms', auth, form.getAllForms); // get all forms
router.put('/form/:id', auth, form.updateForm); // update a form
router.delete('/form/:id', auth, form.deleteForm); // delete a form

//routeur.post('/form/:id/response', auth, form.createResponse); // create a new response

module.exports = router;
