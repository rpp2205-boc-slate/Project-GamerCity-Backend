const pool = require('../index.js');

module.exports = () => {

  const query = {
    text: `
    SELECT user_id, username FROM public.user
    ;`
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async res => {
          const response = {};
          response['users'] = res.rows[0].json_agg;
          client.release()
          return response
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
          return err.stack
        })
    })
}