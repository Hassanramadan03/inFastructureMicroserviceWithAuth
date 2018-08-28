const express = require('express');
const router = express.Router();
const auth_controller = require('./auth_controller');

router.post('/signin',auth_controller.signin);
router.post('/signup', auth_controller.signup);
router.post('/authorize', auth_controller.authorize);
module.exports = router;