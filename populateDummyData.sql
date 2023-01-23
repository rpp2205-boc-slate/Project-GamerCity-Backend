INSERT INTO public.user
(
  user_id, username, email, password, first_name, last_name,
  bio, session_id, created_time
)
SELECT id, 'user_' || id, 'user_' || id || '@' || (
    CASE (RANDOM() * 2)::INT
      WHEN 0 THEN 'gmail'
      WHEN 1 THEN 'hotmail'
      WHEN 2 THEN 'yahoo'
    END
  ) || '.com' AS email,
  'user_' || id || 'PW', 'user_' || id || 'FN', 'user_' || id || 'LN',
  'user_' || id || 'BIO',
  (
   CASE (RANDOM() + 1)::INT
      WHEN 1 THEN ''
      WHEN 2 THEN md5(random()::text)
    END
  ),
  NOW() - '1 day'::INTERVAL * (RANDOM()* 1000 + 2000)::INT
FROM generate_series(1,100) id;



INSERT INTO public.conversation
(
  conversation_id, conversation_name
)
SELECT id, (
   CASE (RANDOM() + 1)::INT
      WHEN 1 THEN ''
      WHEN 2 THEN 'random group'||id
    END
  )
FROM generate_series(1,100) id;



INSERT INTO public.favgames
(
  id, user_id, game_id
)
SELECT id, (RANDOM() * 500)::INT, (RANDOM() * 10000)::INT
FROM generate_series(1,100) id;



INSERT INTO public.friend_relation
(
  relation_id, user1_id, user2_id,
  user1_req_user2, user1_blk_user2
)
SELECT id, (RANDOM() * 500)::INT, (RANDOM() * 500)::INT,
  (
   CASE (RANDOM() * 2)::INT
      WHEN 0 THEN ''
      WHEN 1 THEN 'pending'
      WHEN 2 THEN 'approved'
    END
  ),
  (
   CASE (RANDOM() + 1)::INT
      WHEN 1 THEN true
      WHEN 2 THEN false
    END
  )
FROM generate_series(1,100) id;



INSERT INTO public.group_member
(
  user_id, conversation_id, joined_time, left_time
)
SELECT (RANDOM() * 500)::INT, (RANDOM() * 500)::INT,
  NOW() - '1 day'::INTERVAL * (RANDOM()* 1000+1000)::INT,
  (
   CASE (RANDOM() + 1)::INT
      WHEN 1 THEN '1900-01-01 00:00:00.000000+00'
      WHEN 2 THEN ( NOW() - '1 day'::INTERVAL * (RANDOM()* 100)::INT)
    END
  )
FROM generate_series(1,100) id;



INSERT INTO public.message
(
  message_id, sender_id, message_text, conversation_id, sent_time
)
SELECT id, (RANDOM() * 500)::INT,
  (
   CASE (RANDOM() * 4)::INT
      WHEN 0 THEN 'hey bro'
      WHEN 1 THEN 'i love the new gameID ' || (RANDOM() * 500)::INT
      WHEN 2 THEN 'gamercity is dope!'
      WHEN 3 THEN 'message feature is awesome'
      WHEN 4 THEN 'GTA 6 is coming soon!'
   END
  ),
  (RANDOM() * 500)::INT,
  NOW() - '1 day'::INTERVAL * (RANDOM()* 1000+1000)::INT
FROM generate_series(1,1000) id;



INSERT INTO public.profile_photos
(
  photo_id, user_id, photo_url
)
SELECT id, (RANDOM() * 100)::INT, 'https://picsum.photos/200'
FROM generate_series(1,100) id;