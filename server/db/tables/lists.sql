CREATE TABLE IF NOT EXISTS lists(
  id text PRIMARY KEY,
  index serial NOT NULL UNIQUE,
  created_at integer DEFAULT extract(epoch from now()),
  title text NOT NULL CHECK (title <> ''),
  link text UNIQUE CHECK (
    link ~* '\/boards\/.*\/lists\/.*'
  ),
  deleted boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS lists_cards(
  list_id text NOT NULL REFERENCES lists ON DELETE RESTRICT,
  card_id text PRIMARY KEY REFERENCES cards ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION cards_insert_link() RETURNS trigger AS $$
  DECLARE
    rec RECORD;
  BEGIN
    SELECT bl.board_id INTO rec FROM boards_lists AS bl
      WHERE bl.list_id = NEW.list_id;
    UPDATE cards SET (link) = ('/boards/' || rec.board_id || '/cards/' || NEW.card_id)
      WHERE id = NEW.card_id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cards_insert_link ON lists_cards;
CREATE TRIGGER cards_insert_link BEFORE INSERT OR UPDATE ON lists_cards FOR EACH ROW EXECUTE PROCEDURE cards_insert_link();
