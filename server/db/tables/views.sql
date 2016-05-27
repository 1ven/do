CREATE OR REPLACE VIEW search AS
SELECT id, title AS content, 'boards' AS type FROM boards
UNION
SELECT id, title AS content, 'lists' AS type FROM lists
UNION
SELECT id, text AS content, 'cards' AS type FROM cards
