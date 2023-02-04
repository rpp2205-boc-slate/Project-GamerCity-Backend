const pool = require('../index.js');

module.exports = (keyword) => {

  const query = {
    text: `
    SELECT json_agg(user_info) FROM (
      SELECT user_id, username, created_time, (
          SELECT coalesce(json_agg(photos), '[]'::json) FROM (
            SELECT photo_id, photo_url FROM profile_photos WHERE user_id = public.user.user_id) photos
        ) AS photos FROM public.user
      WHERE public.user.username LIKE '%' || '${keyword}' || '%'
      ORDER BY created_time DESC
      LIMIT 200
      ) user_info;
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
    .catch(err => {console.log(err)})
}