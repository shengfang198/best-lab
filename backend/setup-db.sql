-- Database setup script for Best Lab
-- Run this in PostgreSQL to set up the database

-- Create database (if not exists)
CREATE DATABASE best_lab;

-- Connect to the database
\c best_lab;

-- Create user (if needed)
CREATE USER alcohol WITH PASSWORD 'solution';

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE best_lab TO alcohol;

-- Create tables (add your schema here)
-- Example:
-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- You can add more tables and schema as needed
