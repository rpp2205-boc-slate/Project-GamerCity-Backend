const pool = require('../index.js');
const db_getProfile = require('./getProfile.js');

module.exports = (username, email, photo) => {
  const query = {
    text: `
    SELECT user_id FROM public.user
    WHERE (public.user.username='${username}' AND public.user.email='${email}');
    INSERT INTO public.user (
      user_id, username, email, password, first_name, last_name,
      bio, session_id, created_time)
    SELECT (select max(user_id) from public.user) + 1, '${username}', '${email}', '', '',
	  '', '', '', NOW()
    WHERE NOT EXISTS
    (SELECT * FROM public.user
     WHERE (public.user.username='${username}' OR public.user.email='${email}'))
    RETURNING user_id;
    INSERT INTO profile_photos (photo_id, user_id, photo_url)
    SELECT (select max(photo_id) from profile_photos) + 1,
      (SELECT user_id FROM public.user
        WHERE public.user.username='${username}'), '${photo}'
    RETURNING user_id
    ;`
  }

  return pool
    .connect()
    .then(client => {
      return client
        .query(query)
        .then(async res => {
          return db_getProfile(res[2].rows[0].user_id)
            .then(async res => {
              return res
            })
            .catch(err => {
             console.log(err.stack)
              return err.stack
            })
          client.release()
        })
        .catch(err => {
          client.release()
          console.log(err.stack)
          return err.stack
        })
    })
    .catch(err => {console.log(err)})
}