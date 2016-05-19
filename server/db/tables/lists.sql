CREATE TABLE IF NOT EXISTS lists(
    id serial PRIMARY KEY,
    title text NOT NULL CHECK (title <> '')
);

CREATE TABLE IF NOT EXISTS lists_cards(
    list_id integer NOT NULL REFERENCES lists ON DELETE RESTRICT,
    card_id integer PRIMARY KEY REFERENCES cards ON DELETE CASCADE
);
