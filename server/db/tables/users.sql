CREATE TABLE IF NOT EXISTS users(
  id text PRIMARY KEY,
  index serial NOT NULL UNIQUE,
  created_at integer DEFAULT extract(epoch from now()),
  avatar text DEFAULT 'http://placehold.it/38x38',
  username character varying(20) UNIQUE NOT NULL CHECK (
    length(username) > 2 and
    username ~* '^\S*$' and
    username = lower(username)
  ),
  email text UNIQUE NOT NULL CHECK (
    email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$' and
    email = lower(email)
  ),
  hash text NOT NULL CHECK (hash <> ''),
  salt text NOT NULL CHECK (salt <> '')
);

CREATE TABLE IF NOT EXISTS users_boards(
  user_id text NOT NULL REFERENCES users ON DELETE RESTRICT,
  board_id text PRIMARY KEY REFERENCES boards ON DELETE CASCADE,
  board_index serial UNIQUE
);

CREATE TABLE IF NOT EXISTS users_comments(
  user_id text NOT NULL REFERENCES users ON DELETE RESTRICT,
  comment_id text PRIMARY KEY REFERENCES comments ON DELETE CASCADE
);
