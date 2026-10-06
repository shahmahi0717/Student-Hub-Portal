
CREATE DATABASE IF NOT EXISTS student_hub
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE student_hub;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_code VARCHAR(30) UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    course VARCHAR(100),
    semester INT,
    enrollment VARCHAR(50),
    division VARCHAR(10),
    city VARCHAR(100),
    gender VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(30) PRIMARY KEY,
    code VARCHAR(30),
    name VARCHAR(150) NOT NULL,
    faculty VARCHAR(100),
    semester INT,
    credits INT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS assignments (
    id VARCHAR(30) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subject VARCHAR(150),
    faculty VARCHAR(100),
    assigned_date DATE,
    due_date DATE,
    status VARCHAR(30),
    description TEXT
);

CREATE TABLE IF NOT EXISTS notices (
    id VARCHAR(30) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    notice_date DATE,
    category VARCHAR(100),
    priority VARCHAR(30),
    description TEXT
);

CREATE TABLE IF NOT EXISTS results (
    id VARCHAR(30) PRIMARY KEY,
    student_code VARCHAR(30),
    semester INT,
    subject VARCHAR(150),
    marks DECIMAL(5,2),
    grade VARCHAR(10),
    FOREIGN KEY (student_code)
        REFERENCES students(student_code)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS timetable (
    id VARCHAR(30) PRIMARY KEY,
    day VARCHAR(20),
    class_time VARCHAR(50),
    subject VARCHAR(150),
    faculty VARCHAR(100),
    room VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS study_materials (
    id VARCHAR(30) PRIMARY KEY,
    title VARCHAR(200),
    subject VARCHAR(150),
    semester INT,
    material_type VARCHAR(50),
    description TEXT
);

CREATE TABLE IF NOT EXISTS placements (
    id VARCHAR(30) PRIMARY KEY,
    company VARCHAR(150),
    job_role VARCHAR(150),
    location VARCHAR(100),
    package VARCHAR(50),
    eligibility VARCHAR(200),
    last_date DATE
);

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject VARCHAR(150) NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present','Absent','Leave') NOT NULL,
    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS library (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    book_title VARCHAR(200) NOT NULL,
    issue_date DATE,
    due_date DATE,
    return_date DATE NULL,
    status VARCHAR(30) DEFAULT 'Issued',
    FOREIGN KEY (student_id)
        REFERENCES students(id)
        ON DELETE CASCADE
);