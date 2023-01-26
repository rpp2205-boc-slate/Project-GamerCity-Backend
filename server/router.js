const express = require('express');
const router = express.Router();
const models = require('./models.js');

router.get('/users', models.getUsers);
router.get('/user/:user_id/profile', models.getProfile);

module.exports = router;