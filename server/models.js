const db_getUsers = require('../database/queries/getUsers.js');
const db_getProfile = require('../database/queries/getProfile.js');

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
  }


}