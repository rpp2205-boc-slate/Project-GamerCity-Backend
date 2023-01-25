const express = require('express');
const router = express.Router();
const models = require('./models.js');

router.get('/users', models.getUsers);

module.exports = router;