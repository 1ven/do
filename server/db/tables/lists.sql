CREATE TABLE IF NOT EXISTS lists(
    id text PRIMARY KEY,
    index serial NOT NULL UNIQUE,
    created_at timestamp DEFAULT now(),
    title text NOT NULL CHECK (title <> '')
);

CREATE TABLE IF NOT EXISTS lists_cards(
    list_id text NOT NULL REFERENCES lists ON DELETE RESTRICT,
    card_id text PRIMARY KEY REFERENCES cards ON DELETE CASCADE
);
