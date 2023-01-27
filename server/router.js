const express = require('express');
const router = express.Router();
const models = require('./models.js');

router.get('/users', models.getUsers);
router.get('/user/:user_id/profile', models.getProfile);
router.post('/friends/:user1_id/request/:user2_id', models.addFriend);
router.post('/friends/:user1_id/respond/:user2_id', models.respondFriend);

module.exports = router;