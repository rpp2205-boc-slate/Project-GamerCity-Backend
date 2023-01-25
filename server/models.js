const db_getUsers = require('../database/queries/getUsers.js');

module.exports = {
  getUsers: (req, res) => {
    db_getUsers()
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}