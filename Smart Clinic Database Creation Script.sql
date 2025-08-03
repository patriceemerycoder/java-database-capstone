-- ============================================================================
-- Smart Clinic Database Creation Script
-- Based on Java Database Capstone Project Models
-- ============================================================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS cms;
USE cms;

-- ============================================================================
-- Drop tables if they exist (for clean recreation)
-- ============================================================================
DROP TABLE IF EXISTS prescription;
DROP TABLE IF EXISTS doctor_available_times;
DROP TABLE IF EXISTS appointment;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS doctor;
DROP TABLE IF EXISTS patient;

-- ============================================================================
-- 1. ADMIN Table
-- ============================================================================
CREATE TABLE admin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. PATIENT Table
-- ============================================================================
CREATE TABLE patient (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints based on Java validation annotations
    CONSTRAINT chk_patient_name_length CHECK (LENGTH(name) >= 3),
    CONSTRAINT chk_patient_password_length CHECK (LENGTH(password) >= 6),
    CONSTRAINT chk_patient_phone_format CHECK (phone REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$'),
    CONSTRAINT chk_patient_email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- 3. DOCTOR Table
-- ============================================================================
CREATE TABLE doctor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Constraints based on Java validation annotations
    CONSTRAINT chk_doctor_name_length CHECK (LENGTH(name) >= 3),
    CONSTRAINT chk_doctor_specialty_length CHECK (LENGTH(specialty) >= 3),
    CONSTRAINT chk_doctor_password_length CHECK (LENGTH(password) >= 6),
    CONSTRAINT chk_doctor_phone_format CHECK (phone REGEXP '^[0-9]{3}-[0-9]{3}-[0-9]{4}$'),
    CONSTRAINT chk_doctor_email_format CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- ============================================================================
-- 4. DOCTOR_AVAILABLE_TIMES Table
-- This table represents the @ElementCollection availableTimes from Doctor entity
-- ============================================================================
CREATE TABLE doctor_available_times (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    available_time VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE,
    INDEX idx_doctor_available_times (doctor_id)
);

-- ============================================================================
-- 5. APPOINTMENT Table
-- ============================================================================
CREATE TABLE appointment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    appointment_time DATETIME NOT NULL,
    status INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE RESTRICT,
    FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE RESTRICT,
    
    -- Business Constraints
    CONSTRAINT chk_appointment_status CHECK (status IN (0, 1)), -- 0 = Scheduled, 1 = Completed
    -- Note: Removed future time constraint to allow historical completed appointments
    
    -- Indexes for performance
    INDEX idx_appointment_doctor (doctor_id),
    INDEX idx_appointment_patient (patient_id),
    INDEX idx_appointment_time (appointment_time),
    INDEX idx_appointment_status (status)
);

-- ============================================================================
-- 6. PRESCRIPTION Table (Hybrid Architecture: MySQL + MongoDB)
-- ============================================================================
-- NOTE: This project uses a HYBRID database approach for prescriptions:
-- - MySQL: Stores prescription data for relational queries and reporting
-- - MongoDB: Stores prescription documents for rich metadata and flexible schemas
-- - Both databases are synchronized via appointmentId
-- - See setup_mongodb_prescriptions.js for MongoDB configuration
-- ============================================================================
CREATE TABLE prescription (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    appointment_id BIGINT NOT NULL,
    medication VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    doctor_notes VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Constraints
    FOREIGN KEY (appointment_id) REFERENCES appointment(id) ON DELETE RESTRICT,
    
    -- Constraints based on Java validation annotations
    CONSTRAINT chk_prescription_patient_name_length CHECK (LENGTH(patient_name) >= 3),
    CONSTRAINT chk_prescription_medication_length CHECK (LENGTH(medication) >= 3),
    CONSTRAINT chk_prescription_doctor_notes_length CHECK (doctor_notes IS NULL OR LENGTH(doctor_notes) <= 200),
    
    -- Indexes for performance
    INDEX idx_prescription_appointment (appointment_id),
    INDEX idx_prescription_patient_name (patient_name),
    INDEX idx_prescription_medication (medication)
);

-- ============================================================================
-- Sample Data Insertion (Optional)
-- ============================================================================

-- Insert sample admin
INSERT INTO admin (username, password) VALUES 
('admin', '$2a$10$example.hash.for.admin.password'); -- Use proper password hashing in production

-- Insert sample patients
INSERT INTO patient (address, email, name, password, phone) VALUES
('101 Oak St, Cityville', 'jane.doe@example.com', 'Jane Doe', 'passJane1', '888-111-1111'),
('202 Maple Rd, Townsville', 'john.smith@example.com', 'John Smith', 'smithSecure', '888-222-2222'),
('303 Pine Ave, Villageton', 'emily.rose@example.com', 'Emily Rose', 'emilyPass99', '888-333-3333'),
('404 Birch Ln, Metropolis', 'michael.j@example.com', 'Michael Jordan', 'airmj23', '888-444-4444'),
('505 Cedar Blvd, Springfield', 'olivia.m@example.com', 'Olivia Moon', 'moonshine12', '888-555-5555'),
('606 Spruce Ct, Gotham', 'liam.k@example.com', 'Liam King', 'king321', '888-666-6666'),
('707 Aspen Dr, Riverdale', 'sophia.l@example.com', 'Sophia Lane', 'sophieLane', '888-777-7777'),
('808 Elm St, Newtown', 'noah.b@example.com', 'Noah Brooks', 'noahBest!', '888-888-8888'),
('909 Willow Way, Star City', 'ava.d@example.com', 'Ava Daniels', 'avaSecure8', '888-999-9999'),
('111 Chestnut Pl, Midvale', 'william.h@example.com', 'William Harris', 'willH2025', '888-000-0000'),
('112 Redwood St, Fairview', 'mia.g@example.com', 'Mia Green', 'miagreen1', '889-111-1111'),
('113 Cypress Rd, Edgewater', 'james.b@example.com', 'James Brown', 'jamiebrown', '889-222-2222'),
('114 Poplar Ave, Crestwood', 'amelia.c@example.com', 'Amelia Clark', 'ameliacool', '889-333-3333'),
('115 Sequoia Dr, Elmwood', 'ben.j@example.com', 'Ben Johnson', 'bennyJ', '889-444-4444'),
('116 Palm Blvd, Harborview', 'ella.m@example.com', 'Ella Monroe', 'ellam123', '889-555-5555'),
('117 Cottonwood Ct, Laketown', 'lucas.t@example.com', 'Lucas Turner', 'lucasTurn', '889-666-6666'),
('118 Sycamore Ln, Hilltop', 'grace.s@example.com', 'Grace Scott', 'graceful', '889-777-7777'),
('119 Magnolia Pl, Brookside', 'ethan.h@example.com', 'Ethan Hill', 'hill2025', '889-888-8888'),
('120 Fir St, Woodland', 'ruby.w@example.com', 'Ruby Ward', 'rubypass', '889-999-9999'),
('121 Beech Way, Lakeside', 'jack.b@example.com', 'Jack Baker', 'bakerjack', '889-000-0000'),
('122 Alder Ave, Pinehill', 'mia.h@example.com', 'Mia Hall', 'hallMia', '890-111-1111'),
('123 Hawthorn Blvd, Meadowbrook', 'owen.t@example.com', 'Owen Thomas', 'owen123', '890-222-2222'),
('124 Dogwood Dr, Summit', 'ivy.j@example.com', 'Ivy Jackson', 'ivyIvy', '890-333-3333'),
('125 Juniper Ct, Greenwood', 'leo.m@example.com', 'Leo Martin', 'leopass', '890-444-4444'),
('126 Olive Rd, Ashville', 'ella.moore@example.com', 'Ella Moore', 'ellamoore', '890-555-5555');

-- Insert sample doctors
INSERT INTO doctor (name, specialty, email, password, phone) VALUES 
('Dr. Alice Johnson', 'Cardiology', 'alice.johnson@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-123-4567'),
('Dr. Bob Wilson', 'Pediatrics', 'bob.wilson@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-987-6543'),
('Dr. Carol Smith', 'Dermatology', 'carol.smith@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-234-5678'),
('Dr. David Brown', 'Orthopedics', 'david.brown@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-345-6789'),
('Dr. Emma Davis', 'Neurology', 'emma.davis@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-456-7890'),
('Dr. Frank Miller', 'Psychiatry', 'frank.miller@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-567-8901'),
('Dr. Grace Lee', 'Gynecology', 'grace.lee@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-678-9012'),
('Dr. Henry Taylor', 'Urology', 'henry.taylor@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-789-0123'),
('Dr. Iris White', 'Oncology', 'iris.white@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-890-1234'),
('Dr. Jack Green', 'Radiology', 'jack.green@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-901-2345'),
('Dr. Kate Adams', 'Pathology', 'kate.adams@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-012-3456'),
('Dr. Luke Thompson', 'Emergency Medicine', 'luke.thompson@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-123-4567'),
('Dr. Maya Robinson', 'Anesthesiology', 'maya.robinson@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-234-5678'),
('Dr. Nathan Clark', 'Gastroenterology', 'nathan.clark@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-345-6789'),
('Dr. Olivia Martinez', 'Endocrinology', 'olivia.martinez@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-456-7890'),
('Dr. Paul Anderson', 'Rheumatology', 'paul.anderson@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-567-8901'),
('Dr. Quinn Wilson', 'Pulmonology', 'quinn.wilson@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-678-9012'),
('Dr. Rachel Moore', 'Hematology', 'rachel.moore@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-789-0123'),
('Dr. Samuel Garcia', 'Nephrology', 'samuel.garcia@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-890-1234'),
('Dr. Tina Lopez', 'Infectious Disease', 'tina.lopez@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-901-2345'),
('Dr. Uma Patel', 'Allergy & Immunology', 'uma.patel@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-012-3456'),
('Dr. Victor Hall', 'Sports Medicine', 'victor.hall@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-123-4567'),
('Dr. Wendy King', 'Geriatrics', 'wendy.king@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-234-5678'),
('Dr. Xavier Scott', 'Family Medicine', 'xavier.scott@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-345-6789'),
('Dr. Yara Evans', 'Internal Medicine', 'yara.evans@clinic.com', '$2a$10$example.hash.for.doctor.password', '555-456-7890');

-- Insert sample available times for doctors
INSERT INTO doctor_available_times (doctor_id, available_time) VALUES
(1, '09:00-10:00'), (1, '10:00-11:00'), (1, '11:00-12:00'), (1, '14:00-15:00'),
(2, '10:00-11:00'), (2, '11:00-12:00'), (2, '14:00-15:00'), (2, '15:00-16:00'),
(3, '09:00-10:00'), (3, '11:00-12:00'), (3, '14:00-15:00'), (3, '16:00-17:00'),
(4, '09:00-10:00'), (4, '10:00-11:00'), (4, '15:00-16:00'), (4, '16:00-17:00'),
(5, '09:00-10:00'), (5, '10:00-11:00'), (5, '14:00-15:00'), (5, '15:00-16:00'),
(6, '09:00-10:00'), (6, '10:00-11:00'), (6, '11:00-12:00'), (6, '14:00-15:00'),
(7, '09:00-10:00'), (7, '10:00-11:00'), (7, '15:00-16:00'), (7, '16:00-17:00'),
(8, '10:00-11:00'), (8, '11:00-12:00'), (8, '14:00-15:00'), (8, '15:00-16:00'),
(9, '09:00-10:00'), (9, '11:00-12:00'), (9, '13:00-14:00'), (9, '14:00-15:00'),
(10, '10:00-11:00'), (10, '11:00-12:00'), (10, '14:00-15:00'), (10, '16:00-17:00'),
(11, '09:00-10:00'), (11, '12:00-13:00'), (11, '14:00-15:00'), (11, '15:00-16:00'),
(12, '10:00-11:00'), (12, '11:00-12:00'), (12, '13:00-14:00'), (12, '14:00-15:00'),
(13, '13:00-14:00'), (13, '14:00-15:00'), (13, '15:00-16:00'), (13, '16:00-17:00'),
(14, '09:00-10:00'), (14, '10:00-11:00'), (14, '14:00-15:00'), (14, '16:00-17:00'),
(15, '10:00-11:00'), (15, '11:00-12:00'), (15, '13:00-14:00'), (15, '14:00-15:00'),
(16, '09:00-10:00'), (16, '11:00-12:00'), (16, '14:00-15:00'), (16, '16:00-17:00'),
(17, '09:00-10:00'), (17, '10:00-11:00'), (17, '11:00-12:00'), (17, '12:00-13:00'),
(18, '09:00-10:00'), (18, '10:00-11:00'), (18, '11:00-12:00'), (18, '15:00-16:00'),
(19, '13:00-14:00'), (19, '14:00-15:00'), (19, '15:00-16:00'), (19, '16:00-17:00'),
(20, '10:00-11:00'), (20, '13:00-14:00'), (20, '14:00-15:00'), (20, '15:00-16:00'),
(21, '09:00-10:00'), (21, '10:00-11:00'), (21, '14:00-15:00'), (21, '15:00-16:00'),
(22, '10:00-11:00'), (22, '11:00-12:00'), (22, '14:00-15:00'), (22, '16:00-17:00'),
(23, '11:00-12:00'), (23, '13:00-14:00'), (23, '15:00-16:00'), (23, '16:00-17:00'),
(24, '12:00-13:00'), (24, '13:00-14:00'), (24, '14:00-15:00'), (24, '15:00-16:00'),
(25, '09:00-10:00'), (25, '10:00-11:00'), (25, '14:00-15:00'), (25, '15:00-16:00');

-- Insert sample appointments (comprehensive dataset with scheduled and completed appointments)
INSERT INTO appointment (appointment_time, status, doctor_id, patient_id) VALUES
-- Scheduled appointments (status = 0) - Future dates
('2025-08-01 09:00:00.000000', 0, 1, 1),
('2025-08-02 10:00:00.000000', 0, 1, 2),
('2025-08-03 11:00:00.000000', 0, 1, 3),
('2025-08-04 14:00:00.000000', 0, 1, 4),
('2025-08-05 15:00:00.000000', 0, 1, 5),
('2025-08-06 13:00:00.000000', 0, 1, 6),
('2025-08-07 09:00:00.000000', 0, 1, 7),
('2025-08-08 16:00:00.000000', 0, 1, 8),
('2025-08-09 11:00:00.000000', 0, 1, 9),
('2025-08-10 10:00:00.000000', 0, 1, 10),
('2025-08-11 12:00:00.000000', 0, 1, 11),
('2025-08-12 15:00:00.000000', 0, 1, 12),
('2025-08-13 13:00:00.000000', 0, 1, 13),
('2025-08-14 10:00:00.000000', 0, 1, 14),
('2025-08-15 11:00:00.000000', 0, 1, 15),
('2025-08-16 14:00:00.000000', 0, 1, 16),
('2025-08-17 09:00:00.000000', 0, 1, 17),
('2025-08-18 12:00:00.000000', 0, 1, 18),
('2025-08-19 13:00:00.000000', 0, 1, 19),
('2025-08-20 16:00:00.000000', 0, 1, 20),
('2025-08-21 14:00:00.000000', 0, 1, 21),
('2025-08-22 10:00:00.000000', 0, 1, 22),
('2025-08-23 11:00:00.000000', 0, 1, 23),
('2025-08-24 15:00:00.000000', 0, 1, 24),
('2025-08-25 09:00:00.000000', 0, 1, 25),
('2025-08-01 10:00:00.000000', 0, 2, 1),
('2025-08-02 11:00:00.000000', 0, 2, 2),
('2025-08-03 14:00:00.000000', 0, 2, 3),
('2025-08-04 15:00:00.000000', 0, 2, 4),
('2025-08-05 10:00:00.000000', 0, 2, 5),
('2025-08-06 11:00:00.000000', 0, 2, 6),
('2025-08-07 14:00:00.000000', 0, 2, 7),
('2025-08-08 15:00:00.000000', 0, 2, 8),
('2025-08-09 10:00:00.000000', 0, 2, 9),
('2025-08-10 14:00:00.000000', 0, 2, 10),
('2025-08-11 13:00:00.000000', 0, 2, 11),
('2025-08-12 14:00:00.000000', 0, 2, 12),
('2025-08-13 15:00:00.000000', 0, 2, 13),
('2025-08-14 10:00:00.000000', 0, 2, 14),
('2025-08-15 11:00:00.000000', 0, 2, 15),
('2025-08-16 14:00:00.000000', 0, 2, 16),
('2025-08-17 10:00:00.000000', 0, 2, 17),
('2025-08-18 13:00:00.000000', 0, 2, 18),
('2025-08-19 14:00:00.000000', 0, 2, 19),
('2025-08-20 11:00:00.000000', 0, 2, 20),
('2025-08-21 13:00:00.000000', 0, 2, 21),
('2025-08-22 14:00:00.000000', 0, 2, 22),
('2025-08-23 10:00:00.000000', 0, 2, 23),
('2025-08-24 15:00:00.000000', 0, 2, 24),
('2025-08-25 13:00:00.000000', 0, 2, 25),
-- Completed appointments (status = 1) - Past dates
('2025-07-01 10:00:00.000000', 1, 1, 2),
('2025-07-02 11:00:00.000000', 1, 2, 3),
('2025-07-03 14:00:00.000000', 1, 1, 4),
('2025-07-04 15:00:00.000000', 1, 2, 5),
('2025-07-05 10:00:00.000000', 1, 1, 6),
('2025-07-06 11:00:00.000000', 1, 2, 7),
('2025-07-07 14:00:00.000000', 1, 1, 8),
('2025-07-08 15:00:00.000000', 1, 2, 9),
('2025-07-09 10:00:00.000000', 1, 1, 10),
('2025-07-10 14:00:00.000000', 1, 2, 11),
('2025-07-11 13:00:00.000000', 1, 1, 12),
('2025-07-12 14:00:00.000000', 1, 2, 13),
('2025-07-13 15:00:00.000000', 1, 1, 14),
('2025-07-14 10:00:00.000000', 1, 2, 15),
('2025-07-15 11:00:00.000000', 1, 1, 16),
('2025-07-16 14:00:00.000000', 1, 2, 17),
('2025-07-17 10:00:00.000000', 1, 1, 18),
('2025-07-18 13:00:00.000000', 1, 2, 19),
('2025-07-19 14:00:00.000000', 1, 1, 20),
('2025-07-20 11:00:00.000000', 1, 2, 21),
('2025-07-21 13:00:00.000000', 1, 1, 22),
('2025-07-22 14:00:00.000000', 1, 2, 23),
('2025-07-23 10:00:00.000000', 1, 1, 24),
('2025-07-24 15:00:00.000000', 1, 2, 25),
('2025-07-25 13:00:00.000000', 1, 1, 25),
('2025-06-01 09:00:00.000000', 1, 1, 1),
('2025-06-02 10:00:00.000000', 1, 1, 2),
('2025-06-03 11:00:00.000000', 1, 1, 3),
('2025-06-04 14:00:00.000000', 1, 1, 4),
('2025-06-05 10:00:00.000000', 1, 1, 5),
('2025-06-10 10:00:00.000000', 1, 1, 6),
('2025-06-11 09:00:00.000000', 1, 1, 7),
('2025-06-14 13:00:00.000000', 1, 1, 8),
('2025-06-01 10:00:00.000000', 1, 2, 1),
('2025-06-01 11:00:00.000000', 1, 2, 2),
('2025-06-02 09:00:00.000000', 1, 2, 3),
('2025-06-02 10:00:00.000000', 1, 2, 4),
('2025-06-03 11:00:00.000000', 1, 2, 5),
('2025-06-03 12:00:00.000000', 1, 2, 6),
('2025-06-04 14:00:00.000000', 1, 2, 7),
('2025-06-04 15:00:00.000000', 1, 2, 8),
('2025-06-05 10:00:00.000000', 1, 2, 9),
('2025-06-05 11:00:00.000000', 1, 2, 10),
('2025-06-06 13:00:00.000000', 1, 2, 11),
('2025-06-06 14:00:00.000000', 1, 2, 12),
('2025-06-07 09:00:00.000000', 1, 2, 13),
('2025-06-07 10:00:00.000000', 1, 2, 14),
('2025-06-08 11:00:00.000000', 1, 2, 15),
('2025-06-08 12:00:00.000000', 1, 2, 16),
('2025-06-09 13:00:00.000000', 1, 2, 17),
('2025-06-09 14:00:00.000000', 1, 2, 18),
('2025-06-10 11:00:00.000000', 1, 2, 19),
('2025-06-10 12:00:00.000000', 1, 2, 20),
('2025-06-11 14:00:00.000000', 1, 2, 21),
('2025-06-11 15:00:00.000000', 1, 2, 22),
('2025-06-12 10:00:00.000000', 1, 2, 23),
('2025-06-12 11:00:00.000000', 1, 2, 24),
('2025-06-13 13:00:00.000000', 1, 2, 25),
('2025-06-13 14:00:00.000000', 1, 2, 1),
('2025-06-14 09:00:00.000000', 1, 2, 2),
('2025-06-14 10:00:00.000000', 1, 2, 3),
('2025-06-15 12:00:00.000000', 1, 2, 4),
('2025-06-15 13:00:00.000000', 1, 2, 5);

-- Insert sample prescriptions
INSERT INTO prescription (patient_name, appointment_id, medication, dosage, doctor_notes) VALUES
('John Smith', 51, 'Paracetamol', '500mg', 'Take 1 tablet every 6 hours.'),
('Emily Rose', 52, 'Aspirin', '300mg', 'Take 1 tablet after meals.'),
('Michael Jordan', 53, 'Ibuprofen', '400mg', 'Take 1 tablet every 8 hours.'),
('Olivia Moon', 54, 'Antihistamine', '10mg', 'Take 1 tablet daily before bed.'),
('Liam King', 55, 'Vitamin C', '1000mg', 'Take 1 tablet daily.'),
('Sophia Lane', 56, 'Antibiotics', '500mg', 'Take 1 tablet every 12 hours.'),
('Noah Brooks', 57, 'Paracetamol', '500mg', 'Take 1 tablet every 6 hours.'),
('Ava Daniels', 58, 'Ibuprofen', '200mg', 'Take 1 tablet every 8 hours.'),
('William Harris', 59, 'Aspirin', '300mg', 'Take 1 tablet after meals.'),
('Mia Green', 60, 'Vitamin D', '1000 IU', 'Take 1 tablet daily with food.'),
('James Brown', 61, 'Antihistamine', '10mg', 'Take 1 tablet every morning.'),
('Amelia Clark', 62, 'Paracetamol', '500mg', 'Take 1 tablet every 6 hours.'),
('Ben Johnson', 63, 'Ibuprofen', '400mg', 'Take 1 tablet every 8 hours.'),
('Ella Monroe', 64, 'Vitamin C', '1000mg', 'Take 1 tablet daily.'),
('Lucas Turner', 65, 'Aspirin', '300mg', 'Take 1 tablet after meals.'),
('Grace Scott', 66, 'Paracetamol', '500mg', 'Take 1 tablet every 6 hours.'),
('Ethan Hill', 67, 'Ibuprofen', '400mg', 'Take 1 tablet every 8 hours.'),
('Ruby Ward', 68, 'Vitamin D', '1000 IU', 'Take 1 tablet daily with food.'),
('Jack Baker', 69, 'Antibiotics', '500mg', 'Take 1 tablet every 12 hours.'),
('Mia Hall', 70, 'Paracetamol', '500mg', 'Take 1 tablet every 6 hours.'),
('Owen Thomas', 71, 'Ibuprofen', '200mg', 'Take 1 tablet every 8 hours.'),
('Ivy Jackson', 72, 'Antihistamine', '10mg', 'Take 1 tablet every morning.'),
('Leo Martin', 73, 'Vitamin C', '1000mg', 'Take 1 tablet daily.'),
('Ella Moore', 74, 'Aspirin', '300mg', 'Take 1 tablet after meals.');

-- ============================================================================
-- Views for common queries
-- ============================================================================

-- View for appointment details with doctor and patient names
CREATE VIEW appointment_details AS
SELECT 
    a.id AS appointment_id,
    a.appointment_time,
    a.status,
    d.name AS doctor_name,
    d.specialty AS doctor_specialty,
    p.name AS patient_name,
    p.phone AS patient_phone,
    p.email AS patient_email
FROM appointment a
JOIN doctor d ON a.doctor_id = d.id
JOIN patient p ON a.patient_id = p.id;

-- View for prescription details with appointment and patient information
-- NOTE: This view uses MySQL prescription data. For MongoDB prescription data,
-- use the MongoDB aggregation pipeline in setup_mongodb_prescriptions.js
CREATE VIEW prescription_details AS
SELECT 
    pr.id AS prescription_id,
    pr.patient_name,
    pr.medication,
    pr.dosage,
    pr.doctor_notes,
    pr.created_at AS prescription_date,
    a.appointment_time,
    d.name AS doctor_name,
    d.specialty AS doctor_specialty,
    p.name AS actual_patient_name,
    p.email AS patient_email,
    p.phone AS patient_phone
FROM prescription pr
JOIN appointment a ON pr.appointment_id = a.id
JOIN doctor d ON a.doctor_id = d.id
JOIN patient p ON a.patient_id = p.id;

-- View for doctor schedule
CREATE VIEW doctor_schedule AS
SELECT 
    d.id AS doctor_id,
    d.name AS doctor_name,
    d.specialty,
    dat.available_time,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM appointment a 
            WHERE a.doctor_id = d.id 
            AND DATE(a.appointment_time) = CURDATE()
            AND TIME(a.appointment_time) BETWEEN 
                TIME(SUBSTRING_INDEX(dat.available_time, '-', 1)) 
                AND TIME(SUBSTRING_INDEX(dat.available_time, '-', -1))
        ) THEN 'Booked'
        ELSE 'Available'
    END AS availability_status
FROM doctor d
LEFT JOIN doctor_available_times dat ON d.id = dat.doctor_id
ORDER BY d.name, dat.available_time;

-- View for patient medication history
-- NOTE: This view uses MySQL prescription data. For comprehensive medication history
-- including MongoDB prescription data, combine this with MongoDB queries
CREATE VIEW patient_medication_history AS
SELECT 
    p.name AS patient_name,
    p.email,
    pr.medication,
    pr.dosage,
    pr.doctor_notes,
    pr.created_at AS prescription_date,
    d.name AS prescribing_doctor,
    d.specialty AS doctor_specialty
FROM prescription pr
JOIN appointment a ON pr.appointment_id = a.id
JOIN patient p ON a.patient_id = p.id
JOIN doctor d ON a.doctor_id = d.id
ORDER BY p.name, pr.created_at DESC;

-- ============================================================================
-- Indexes for optimization
-- ============================================================================

-- Additional indexes for better query performance
CREATE INDEX idx_patient_email ON patient(email);
CREATE INDEX idx_doctor_email ON doctor(email);
CREATE INDEX idx_doctor_specialty ON doctor(specialty);
CREATE INDEX idx_admin_username ON admin(username);
CREATE INDEX idx_prescription_created_at ON prescription(created_at);

-- ============================================================================
-- Stored Procedures
-- ============================================================================

DELIMITER //

-- Procedure to check appointment conflicts
CREATE PROCEDURE CheckAppointmentConflict(
    IN p_doctor_id BIGINT,
    IN p_appointment_time DATETIME,
    OUT p_conflict_exists BOOLEAN
)
BEGIN
    DECLARE conflict_count INT DEFAULT 0;
    
    SELECT COUNT(*) INTO conflict_count
    FROM appointment
    WHERE doctor_id = p_doctor_id
    AND appointment_time = p_appointment_time
    AND status = 0; -- Only check scheduled appointments
    
    SET p_conflict_exists = (conflict_count > 0);
END //

-- Procedure to get available appointments for a doctor
CREATE PROCEDURE GetDoctorAvailableSlots(
    IN p_doctor_id BIGINT,
    IN p_date DATE
)
BEGIN
    SELECT 
        dat.available_time,
        CASE 
            WHEN EXISTS (
                SELECT 1 FROM appointment a 
                WHERE a.doctor_id = p_doctor_id 
                AND DATE(a.appointment_time) = p_date
                AND TIME(a.appointment_time) BETWEEN 
                    TIME(SUBSTRING_INDEX(dat.available_time, '-', 1)) 
                    AND TIME(SUBSTRING_INDEX(dat.available_time, '-', -1))
                AND a.status = 0
            ) THEN 'Booked'
            ELSE 'Available'
        END AS status
    FROM doctor_available_times dat
    WHERE dat.doctor_id = p_doctor_id
    ORDER BY dat.available_time;
END //

DELIMITER ;

-- ============================================================================
-- Grants (adjust as needed for your application user)
-- ============================================================================

-- Create application user (uncomment and modify as needed)
-- CREATE USER 'clinic_app'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON cms.* TO 'clinic_app'@'localhost';
-- FLUSH PRIVILEGES;

-- ============================================================================
-- Script completion message
-- ============================================================================

SELECT 'Smart Clinic Database created successfully!' AS message;
