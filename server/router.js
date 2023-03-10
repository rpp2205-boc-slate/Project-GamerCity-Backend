const express = require('express');
const router = express.Router();
const models = require('./models.js');

router.get('/users/:keyword', models.getUsers);
router.get('/user/:user_id/profile', models.getProfile);
router.post('/friends/:user1_id/request/:user2_id', models.addFriend);
router.post('/friends/:user1_id/respond/:user2_id', models.respondFriend);
router.post('/friends/:user1_id/block/:user2_id', models.blockedFriend);
router.post('/game/:user_id/:game_id', models.likeGame);
router.post('/user/addinfo', models.addUserInfo);
router.post('/user/:user_id/profile', models.updateProfile);
router.put('/user/:user_id/logout', models.logout);

module.exports = router;