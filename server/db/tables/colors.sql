CREATE TABLE IF NOT EXISTS colors(
  id serial PRIMARY KEY,
  color text NOT NULL
);
INSERT INTO colors(id, color) VALUES
(1, '#1abc9c'),
(2, '#c0392b'),
(3, '#2980b9'),
(4, '#33cd5f'),
(5, '#ffc900')
ON CONFLICT(id) DO NOTHING;
