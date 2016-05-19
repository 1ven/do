CREATE TABLE IF NOT EXISTS cards(
    id text PRIMARY KEY,
    text text NOT NULL CHECK (text <> '')
);
