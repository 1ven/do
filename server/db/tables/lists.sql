CREATE TABLE IF NOT EXISTS lists(
    id SERIAL PRIMARY KEY,
    title text,
    cards integer[]
);
