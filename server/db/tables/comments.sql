CREATE TABLE IF NOT EXISTS comments(
  id text PRIMARY KEY,
  index serial NOT NULL UNIQUE,
  created_at integer DEFAULT extract(epoch from now()),
  deleted integer DEFAULT null,
  text text NOT NULL CHECK (text <> '')
);
