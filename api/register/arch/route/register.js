const express = require('express');
const router = express.Router();
const method = require('../controller/RegisterController');

router.post('/',  method.registerUser);

module.exports = router;
