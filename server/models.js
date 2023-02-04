const db_getUsers = require('../database/queries/getUsers.js');
const db_getProfile = require('../database/queries/getProfile.js');
const db_addFriend = require('../database/queries/addFriend.js');
const db_respondFriend = require('../database/queries/respondFriend.js');
const db_blockedFriend = require('../database/queries/blockedFriend.js');
const db_likeGame = require('../database/queries/likeGame.js');
const db_addUserInfo = require('../database/queries/addUserInfo.js');
const db_updateProfile = require('../database/queries/updateProfile.js');

module.exports = {
  getUsers: (req, res) => {
    db_getUsers()
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  getProfile: (req, res) => {
    const user_id = req.params.user_id;
    db_getProfile(user_id)
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  addFriend: (req, res) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    db_addFriend(user1_id, user2_id)
      .then(data => {
        res.status(201).send("CREATED")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  respondFriend: (req, res) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const respond = req.body.respond;
    db_respondFriend(user1_id, user2_id, respond)
      .then(data => {
        res.status(201).send("CREATED")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  blockedFriend: (req, res) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    const blocked = req.body.blocked;
    db_blockedFriend(user1_id, user2_id, blocked)
      .then(data => {
        res.status(201).send("CREATED")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  likeGame: (req, res) => {
    const user_id = req.params.user_id;
    const game_id = req.params.game_id;
    const liked = req.body.liked;
    db_likeGame(user_id, game_id, liked)
      .then(data => {
        res.status(201).send("CREATED")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  addUserInfo: (req, res) => {
    const username = req.body.name;
    const email = req.body.email;
    const photo = req.body.picture;
    db_addUserInfo(username, email, photo)
      .then(data => {
        res.status(201).send(data)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  updateProfile: (req, res) => {
    const obj = {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
    first_name: req.body.first_name || '',
    last_name: req.body.last_name || '',
    bio: req.body.bio || ''
    }
    db_updateProfile(obj)
      .then(data => {
        res.status(201).send("CREATED")
      })
      .catch(err => {
        res.status(400).send(err)
      })
  }
}