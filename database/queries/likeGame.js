const pool = require('../index.js');

module.exports = (user_id, game_id, liked) => {
console.log(user_id, game_id, liked)
  const query = {
    text: `
    UPDATE favgames
    SET liked=${liked}
    WHERE (user_id = ${user_id}
      AND game_id=${game_id});
    INSERT INTO favgames (id, user_id, game_id, liked)
    SELECT (select max(id) from favgames) + 1, ${user_id}, ${game_id}, ${liked}
    WHERE NOT EXISTS
    (SELECT * FROM favgames
     WHERE (user_id=${user_id} AND game_id=${game_id}))
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