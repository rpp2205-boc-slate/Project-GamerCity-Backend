const db_getUsers = require('../database/queries/getUsers.js');
const db_getProfile = require('../database/queries/getProfile.js');
const db_addFriend = require('../database/queries/addFriend.js');

module.exports = {
  getUsers: (req, res) => {
    db_getUsers()
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },

  getProfile: (req, res) => {
    const user_id = req.params.user_id;
    db_getProfile(user_id)
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  },

  addFriend: (req, res) => {
    const user1_id = req.params.user1_id;
    const user2_id = req.params.user2_id;
    db_addFriend(user1_id, user2_id)
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

}