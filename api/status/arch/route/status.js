const express = require('express');
const router = express.Router();
const method = require('../controller/StatusController');

router.get('/',  method.getStatus);
router.get('/logout', method.logoutAll);

module.exports = router;
