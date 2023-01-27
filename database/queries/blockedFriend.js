const pool = require('../index.js');

module.exports = (user1_id, user2_id, blocked) => {
  console.log(blocked)
  const query = {
    text: `
    UPDATE friend_relation
    SET user1_blk_user2=${blocked}
    WHERE (user1_id=${user1_id}
    AND user2_id=${user2_id}
    AND NOT user1_blk_user2=${blocked}
    );
    ;`
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async res => {
          const response = res.command
          client.release()
          return response
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
          return err.stack
        })
    })
    .catch(err => {console.log(err)})
}