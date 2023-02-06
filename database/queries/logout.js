const pool = require('../index.js');

module.exports = (userid) => {
  const query = {
    text: `
    UPDATE public.user
    SET isOnline=false
    WHERE user_id=${userid}
    ;`
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async res => {
          const response = {
            [res.command]: res.rowCount,
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