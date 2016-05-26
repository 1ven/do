CREATE TABLE IF NOT EXISTS cards(
    id text PRIMARY KEY,
    index serial NOT NULL UNIQUE,
    created_at integer DEFAULT extract(epoch from now()),
    text text NOT NULL CHECK (text <> '')
);

CREATE TABLE IF NOT EXISTS cards_comments(
    card_id text NOT NULL REFERENCES cards ON DELETE RESTRICT,
    comment_id text PRIMARY KEY REFERENCES comments ON DELETE CASCADE
);
