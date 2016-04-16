CREATE TABLE IF NOT EXISTS cards(
    id serial PRIMARY KEY,
    text text NOT NULL CHECK (text <> '')
);
