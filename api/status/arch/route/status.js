const express = require('express');
const router = express.Router();
const method = require('../controller/StatusController');

router.get('/',  method.getStatus);

module.exports = router;
