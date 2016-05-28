CREATE OR REPLACE VIEW search AS
SELECT id, title AS content, 'Boards' AS type FROM boards
UNION
SELECT id, title AS content, 'Lists' AS type FROM lists
UNION
SELECT id, text AS content, 'Cards' AS type FROM cards
