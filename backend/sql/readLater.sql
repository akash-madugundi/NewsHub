CREATE TABLE readlater (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    article_id TEXT NOT NULL, -- Unique identifier for the article
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    image_url TEXT,
    published_at TIMESTAMP,
    source TEXT,
    author TEXT,
    description TEXT,
    UNIQUE(user_id, article_id) -- Ensures a user can't save the same article multiple times
);
