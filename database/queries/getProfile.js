const pool = require('../index.js');

module.exports = (user_id) => {

  const query = {
    text: `
    SELECT json_agg(user_profile) FROM (
      SELECT user_id, username, first_name, last_name, bio, email, created_time, (
          SELECT coalesce(json_agg(photos), '[]'::json) FROM (
            SELECT photo_id, photo_url FROM profile_photos WHERE user_id = public.user.user_id) photos
        ) AS photos, (
          SELECT coalesce(json_agg(fav_games), '[]'::json) FROM (
          SELECT game_id FROM favgames
          WHERE user_id=public.user.user_id
          AND liked=true) fav_games
      ) AS fav_games, (
        SELECT coalesce(json_agg(friends_list), '[]'::json) FROM (
          SELECT user2_id AS userid FROM public.friend_relation
          WHERE user1_id=public.user.user_id
          AND user1_req_user2='approved'
          AND NOT user1_blk_user2=true) friends_list
    ) AS friends, (
      SELECT coalesce(json_agg(blocked_list), '[]'::json) FROM (
        SELECT user2_id AS userid FROM public.friend_relation
        WHERE user1_id=public.user.user_id
        AND user1_blk_user2=true) blocked_list
  ) AS blocked_users, (
    SELECT coalesce(json_agg(pending_req), '[]'::json) FROM (
      SELECT user1_id AS userid FROM public.friend_relation
      WHERE user2_id=public.user.user_id
      AND user1_req_user2='pending') pending_req
) AS received_req_from

      FROM public.user
      WHERE user_id=${user_id}
      ORDER BY created_time DESC
      ) user_profile;
    ;`
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async res => {
          const response = res.rows[0].json_agg[0];
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