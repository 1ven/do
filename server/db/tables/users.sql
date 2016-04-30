CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
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
    user_id integer NOT NULL REFERENCES users ON DELETE RESTRICT,
    board_id integer PRIMARY KEY REFERENCES boards ON DELETE CASCADE
);
