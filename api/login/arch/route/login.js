const express = require('express');
const router = express.Router();
const method = require('../controller/LoginController');

router.post('/',  method.loginUser);

module.exports = router;
