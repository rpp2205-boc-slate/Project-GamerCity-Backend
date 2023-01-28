-- Database: boc-slate-db

-- DROP DATABASE IF EXISTS "boc-slate-db";

CREATE DATABASE "boc-slate-db"
    WITH
    OWNER = slatemaster
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- Table: public.conversation

-- DROP TABLE IF EXISTS public.conversation;

CREATE TABLE IF NOT EXISTS public.conversation
(
    conversation_id integer NOT NULL,
    conversation_name character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT conversation_pkey PRIMARY KEY (conversation_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.conversation
    OWNER to slatemaster;


-- Table: public.favgames

-- DROP TABLE IF EXISTS public.favgames;

CREATE TABLE IF NOT EXISTS public.favgames
(
    id integer NOT NULL,
    user_id integer NOT NULL,
    game_id integer NOT NULL,
    liked boolean NOT NULL,
    CONSTRAINT favgames_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.favgames
    OWNER to slatemaster;


-- Table: public.friend_relation

-- DROP TABLE IF EXISTS public.friend_relation;

CREATE TABLE IF NOT EXISTS public.friend_relation
(
    relation_id integer NOT NULL,
    user1_id integer NOT NULL,
    user2_id integer NOT NULL,
    user1_req_user2 character varying(10) COLLATE pg_catalog."default",
    user1_blk_user2 boolean NOT NULL,
    CONSTRAINT friend_relation_pkey PRIMARY KEY (relation_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.friend_relation
    OWNER to slatemaster;


-- Table: public.group_member

-- DROP TABLE IF EXISTS public.group_member;

CREATE TABLE IF NOT EXISTS public.group_member
(
    user_id integer NOT NULL,
    conversation_id integer NOT NULL,
    joined_time character varying COLLATE pg_catalog."default" NOT NULL,
    left_time character varying COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.group_member
    OWNER to slatemaster;


-- Table: public.message

-- DROP TABLE IF EXISTS public.message;

CREATE TABLE IF NOT EXISTS public.message
(
    message_id integer NOT NULL,
    sender_id integer NOT NULL,
    message_text character varying(512) COLLATE pg_catalog."default" NOT NULL,
    conversation_id integer NOT NULL,
    sent_time timestamp without time zone,
    CONSTRAINT message_pkey PRIMARY KEY (message_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.message
    OWNER to slatemaster;


-- Table: public.profile_photos

-- DROP TABLE IF EXISTS public.profile_photos;

CREATE TABLE IF NOT EXISTS public.profile_photos
(
    photo_id integer NOT NULL,
    user_id integer NOT NULL,
    photo_url character varying(256) COLLATE pg_catalog."default",
    CONSTRAINT profile_photos_pkey PRIMARY KEY (photo_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profile_photos
    OWNER to slatemaster;


-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    user_id integer NOT NULL,
    username character varying(64) COLLATE pg_catalog."default" NOT NULL,
    email character varying(64) COLLATE pg_catalog."default" NOT NULL,
    password character varying(64) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(64) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(64) COLLATE pg_catalog."default" NOT NULL,
    bio character varying(512) COLLATE pg_catalog."default",
    session_id character varying(512) COLLATE pg_catalog."default",
    created_time character varying COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to slatemaster;