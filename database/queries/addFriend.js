const pool = require('../index.js');

module.exports = (user1_id, user2_id) => {

  const query = {
    text: `
    UPDATE friend_relation
    SET user1_req_user2='pending'
    WHERE (user1_id = ${user1_id}
      AND user2_id=${user2_id}
      AND NOT user1_req_user2='approved');
    INSERT INTO friend_relation (
      relation_id, user1_id, user2_id, user1_req_user2, user1_blk_user2)
    SELECT (select max(relation_id) from friend_relation) + 1,
      ${user1_id}, ${user2_id}, 'pending', false
    WHERE NOT EXISTS
    (SELECT * FROM friend_relation
     WHERE (user1_id=${user1_id} AND user2_id=${user2_id}));
     INSERT INTO friend_relation (
      relation_id, user1_id, user2_id, user1_req_user2, user1_blk_user2)
    SELECT (select max(relation_id) from friend_relation) + 1,
      ${user2_id}, ${user1_id}, '', false
    WHERE NOT EXISTS
    (SELECT * FROM friend_relation
     WHERE (user1_id=${user2_id} AND user2_id=${user1_id}))
    ;`
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async res => {
          const response = {
            [res[0].command]: res[0].rowCount,
            [res[1].command]: res[1].rowCount
          }
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