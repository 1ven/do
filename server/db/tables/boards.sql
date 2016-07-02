CREATE TABLE IF NOT EXISTS boards(
  id text PRIMARY KEY,
  created_at integer DEFAULT extract(epoch from now()),
  title text NOT NULL CHECK (title <> ''),
  description text,
  link text NOT NULL UNIQUE CHECK (
    link ~* '\/boards\/.*'
  ),
  deleted integer DEFAULT null,
  starred boolean DEFAULT false
);

CREATE OR REPLACE FUNCTION boards_insert_link() RETURNS trigger AS $$
  BEGIN
    NEW.link := '/boards/' || NEW.id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS boards_insert_link ON boards;
CREATE TRIGGER boards_insert_link BEFORE INSERT OR UPDATE ON boards FOR EACH ROW EXECUTE PROCEDURE boards_insert_link();

CREATE TABLE IF NOT EXISTS boards_lists(
  board_id text NOT NULL REFERENCES boards ON DELETE RESTRICT,
  list_id text PRIMARY KEY REFERENCES lists ON DELETE CASCADE,
  list_index serial UNIQUE DEFERRABLE
);

CREATE OR REPLACE FUNCTION lists_insert_link() RETURNS trigger AS $$
  BEGIN
    UPDATE lists SET (link) = ('/boards/' || NEW.board_id || '/lists/' || NEW.list_id)
      WHERE id = NEW.list_id;
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS lists_insert_link ON boards_lists;
CREATE TRIGGER lists_insert_link BEFORE INSERT OR UPDATE ON boards_lists FOR EACH ROW EXECUTE PROCEDURE lists_insert_link();
