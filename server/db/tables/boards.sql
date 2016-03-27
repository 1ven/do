CREATE TABLE IF NOT EXISTS boards(
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    lists integer[]
);
