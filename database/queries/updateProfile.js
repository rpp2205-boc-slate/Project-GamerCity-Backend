const pool = require('../index.js');

module.exports = (obj) => {
  const query = {
    text: `
    UPDATE public.user
    SET  first_name='${obj.first_name}',
         last_name='${obj.last_name}',
         bio='${obj.bio}',
    WHERE public.user.username='${obj.name}'
    AND public.user.email='${obj.email}';
    UPDATE profile_photos
    SET photo_url='${obj.picture}',
    WHERE user_id=(
      SELECT user_id FROM public.user
      WHERE public.user.username='${obj.name}')
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