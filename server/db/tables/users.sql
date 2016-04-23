CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    username character varying(20) UNIQUE NOT NULL CHECK (length(username) > 2),
    email text UNIQUE NOT NULL CHECK (email <> ''),
    hash text NOT NULL CHECK (hash <> ''),
    salt text NOT NULL CHECK (salt <> '')
);
