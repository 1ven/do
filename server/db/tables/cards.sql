CREATE TABLE IF NOT EXISTS cards(
    id text PRIMARY KEY,
    index serial NOT NULL UNIQUE,
    created_at timestamp DEFAULT now(),
    text text NOT NULL CHECK (text <> '')
);
