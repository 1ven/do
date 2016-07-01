CREATE OR REPLACE VIEW search AS (
  SELECT id, title AS content, 'Boards' AS type, '/boards/' || id AS link
  FROM boards LIMIT 5
) UNION (
  SELECT c.id, c.text AS content, 'Cards' AS type,
    '/boards/' || bl.board_id || '/cards/' || c.id AS link
  FROM cards AS c
  LEFT JOIN lists_cards AS lc ON (lc.card_id = c.id)
  LEFT JOIN boards_lists AS bl ON (bl.list_id = lc.list_id)
  LIMIT 5
);
