CREATE TABLE IF NOT EXISTS activity(
    id serial PRIMARY KEY,
    created_at integer DEFAULT extract(epoch from now()),
    action text NOT NULL,
    entry_id text NOT NULL,
    entry_table text NOT NULL
);
