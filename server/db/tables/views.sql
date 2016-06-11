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

CREATE OR REPLACE VIEW trash AS (
  SELECT id AS entry_id, title AS content, 'board' AS type, ub.user_id, deleted
  FROM boards AS b
  LEFT JOIN users_boards AS ub ON (ub.board_id = b.id)
  WHERE b.deleted IS NOT NULL
) UNION (
  SELECT id AS entry_id, title AS content, 'list' AS type, ub.user_id, deleted
  FROM lists AS l
  LEFT JOIN boards_lists AS bl ON (bl.list_id = l.id)
  LEFT JOIN users_boards AS ub ON (ub.board_id = bl.board_id)
  WHERE l.deleted IS NOT NULL
) UNION (
  SELECT id as entry_id, text AS content, 'card' AS type, ub.user_id, deleted
  FROM cards AS c
  LEFT JOIN lists_cards AS lc ON (lc.card_id = c.id)
  LEFT JOIN boards_lists AS bl ON (bl.list_id = lc.list_id)
  LEFT JOIN users_boards AS ub ON (ub.board_id = bl.board_id)
  WHERE c.deleted IS NOT NULL
)
