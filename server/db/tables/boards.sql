CREATE TABLE IF NOT EXISTS boards(
    id serial PRIMARY KEY,
    title text NOT NULL CHECK (title <> '')
);

CREATE TABLE IF NOT EXISTS boards_lists(
    board_id integer NOT NULL REFERENCES boards ON DELETE RESTRICT,
    list_id integer PRIMARY KEY REFERENCES lists ON DELETE CASCADE
);
