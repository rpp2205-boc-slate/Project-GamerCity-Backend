const pool = require('../index.js');

module.exports = (user1_id, user2_id, respond) => {
  const query = {text: ''}
  if (respond === 'approved') {
      query.text = `
      UPDATE friend_relation
      SET user1_req_user2='approved'
      WHERE (user1_id=${user2_id}
      AND user2_id=${user1_id})
      OR (user1_id=${user1_id}
        AND user2_id=${user2_id});
      ;`
  } else if (respond === 'rejected') {
    query.text = `
    UPDATE friend_relation
    SET user1_req_user2='rejected'
    WHERE (user1_id=${user2_id}
    AND user2_id=${user1_id}
    );
    ;`
  } else {
    query.text = `
    UPDATE friend_relation
    SET user1_req_user2=''
    WHERE (user1_id=${user2_id}
    AND user2_id=${user1_id}
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