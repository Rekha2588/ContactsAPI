const express = require('express');
const router = express.Router();
const {getCurrentUser, registerUser, loginUser} = require('./../controllers/userController')
const validateToken = require('./../middleware/validateTokenHandler');

router.route('/current').get(validateToken, getCurrentUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
module.exports = router;