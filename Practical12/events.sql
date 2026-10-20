CREATE DATABASE IF NOT EXISTS practical12
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE practical12;

CREATE TABLE IF NOT EXISTS events (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    event_date DATE NOT NULL,
    category ENUM('Technical', 'Sports', 'Cultural') NOT NULL,
    status ENUM('Open', 'Closed') NOT NULL DEFAULT 'Open',
    poster VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);