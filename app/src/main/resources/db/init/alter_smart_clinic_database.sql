-- ============================================================================
-- Smart Clinic Database ALTER Script
-- Adds missing tables and components to existing database
-- Safe to run on existing smart_clinic_db (MySQL)
-- ============================================================================

USE smart_clinic_db;

-- ============================================================================
-- Create missing tables using conditional logic
-- ============================================================================

-- Create DOCTOR_AVAILABLE_TIMES table if it doesn't exist
SET @table_exists = 0;
SELECT COUNT(*) INTO @table_exists 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'doctor_available_times';

SET @sql = IF(@table_exists = 0, 
    'CREATE TABLE doctor_available_times (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        doctor_id BIGINT NOT NULL,
        available_time VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (doctor_id) REFERENCES doctor(id) ON DELETE CASCADE,
        INDEX idx_doctor_available_times (doctor_id)
    )',
    'SELECT "doctor_available_times table already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Create PRESCRIPTION table if it doesn't exist (optional - remove if using MongoDB only)
SET @table_exists = 0;
SELECT COUNT(*) INTO @table_exists 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'prescription';

SET @sql = IF(@table_exists = 0, 
    'CREATE TABLE prescription (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        patient_name VARCHAR(100) NOT NULL,
        appointment_id BIGINT NOT NULL,
        medication VARCHAR(100) NOT NULL,
        dosage VARCHAR(50) NOT NULL,
        doctor_notes VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (appointment_id) REFERENCES appointment(id) ON DELETE RESTRICT,
        
        CONSTRAINT chk_prescription_patient_name_length CHECK (LENGTH(patient_name) >= 3),
        CONSTRAINT chk_prescription_medication_length CHECK (LENGTH(medication) >= 3),
        CONSTRAINT chk_prescription_doctor_notes_length CHECK (doctor_notes IS NULL OR LENGTH(doctor_notes) <= 200),
        
        INDEX idx_prescription_appointment (appointment_id),
        INDEX idx_prescription_patient_name (patient_name),
        INDEX idx_prescription_medication (medication)
    )',
    'SELECT "prescription table already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================================
-- Add missing columns to existing tables using conditional logic
-- ============================================================================

-- Add created_at and updated_at to admin table if they don't exist
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'admin' 
AND COLUMN_NAME = 'created_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE admin ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'SELECT "admin.created_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'admin' 
AND COLUMN_NAME = 'updated_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE admin ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'SELECT "admin.updated_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add created_at and updated_at to patient table if they don't exist
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'patient' 
AND COLUMN_NAME = 'created_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE patient ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'SELECT "patient.created_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'patient' 
AND COLUMN_NAME = 'updated_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE patient ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'SELECT "patient.updated_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add created_at and updated_at to doctor table if they don't exist
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'doctor' 
AND COLUMN_NAME = 'created_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE doctor ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'SELECT "doctor.created_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'doctor' 
AND COLUMN_NAME = 'updated_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE doctor ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'SELECT "doctor.updated_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add created_at and updated_at to appointment table if they don't exist
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'appointment' 
AND COLUMN_NAME = 'created_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE appointment ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    'SELECT "appointment.created_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'appointment' 
AND COLUMN_NAME = 'updated_at';

SET @sql = IF(@column_exists = 0, 
    'ALTER TABLE appointment ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    'SELECT "appointment.updated_at already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================================
-- Add missing constraints using conditional logic
-- ============================================================================

-- Add patient constraints if they don't exist
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_patient_name_length' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE patient ADD CONSTRAINT chk_patient_name_length CHECK (LENGTH(name) >= 3)',
    'SELECT "chk_patient_name_length constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add more patient constraints
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_patient_password_length' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE patient ADD CONSTRAINT chk_patient_password_length CHECK (LENGTH(password) >= 6)',
    'SELECT "chk_patient_password_length constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add phone format constraint for patient
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_patient_phone_format' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE patient ADD CONSTRAINT chk_patient_phone_format CHECK (phone REGEXP "^[0-9]{3}-[0-9]{3}-[0-9]{4}$")',
    'SELECT "chk_patient_phone_format constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add email format constraint for patient
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_patient_email_format' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE patient ADD CONSTRAINT chk_patient_email_format CHECK (email REGEXP "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}$")',
    'SELECT "chk_patient_email_format constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add doctor constraints
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_doctor_name_length' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE doctor ADD CONSTRAINT chk_doctor_name_length CHECK (LENGTH(name) >= 3)',
    'SELECT "chk_doctor_name_length constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add doctor specialty constraint
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_doctor_specialty_length' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE doctor ADD CONSTRAINT chk_doctor_specialty_length CHECK (LENGTH(specialty) >= 3)',
    'SELECT "chk_doctor_specialty_length constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add doctor password constraint
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_doctor_password_length' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE doctor ADD CONSTRAINT chk_doctor_password_length CHECK (LENGTH(password) >= 6)',
    'SELECT "chk_doctor_password_length constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add doctor phone format constraint
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_doctor_phone_format' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE doctor ADD CONSTRAINT chk_doctor_phone_format CHECK (phone REGEXP "^[0-9]{3}-[0-9]{3}-[0-9]{4}$")',
    'SELECT "chk_doctor_phone_format constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add doctor email format constraint
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_doctor_email_format' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE doctor ADD CONSTRAINT chk_doctor_email_format CHECK (email REGEXP "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Za-z]{2,}$")',
    'SELECT "chk_doctor_email_format constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Add appointment status constraint
SET @constraint_exists = 0;
SELECT COUNT(*) INTO @constraint_exists 
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE CONSTRAINT_NAME = 'chk_appointment_status' 
AND TABLE_SCHEMA = 'smart_clinic_db';

SET @sql = IF(@constraint_exists = 0, 
    'ALTER TABLE appointment ADD CONSTRAINT chk_appointment_status CHECK (status IN (0, 1))',
    'SELECT "chk_appointment_status constraint already exists" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================================
-- Add indexes using conditional logic (ignore errors if they already exist)
-- ============================================================================

-- Helper procedure to add index if it doesn't exist
DELIMITER //
CREATE PROCEDURE AddIndexIfNotExists(
    IN table_name VARCHAR(64),
    IN index_name VARCHAR(64), 
    IN index_definition TEXT
)
BEGIN
    DECLARE index_exists INT DEFAULT 0;
    
    SELECT COUNT(*) INTO index_exists 
    FROM INFORMATION_SCHEMA.STATISTICS 
    WHERE TABLE_SCHEMA = 'smart_clinic_db' 
    AND TABLE_NAME = table_name 
    AND INDEX_NAME = index_name;
    
    IF index_exists = 0 THEN
        SET @sql = CONCAT('CREATE INDEX ', index_name, ' ON ', table_name, ' ', index_definition);
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END //
DELIMITER ;

-- Add indexes
CALL AddIndexIfNotExists('patient', 'idx_patient_email', '(email)');
CALL AddIndexIfNotExists('doctor', 'idx_doctor_email', '(email)');
CALL AddIndexIfNotExists('doctor', 'idx_doctor_specialty', '(specialty)');
CALL AddIndexIfNotExists('admin', 'idx_admin_username', '(username)');
CALL AddIndexIfNotExists('appointment', 'idx_appointment_doctor', '(doctor_id)');
CALL AddIndexIfNotExists('appointment', 'idx_appointment_patient', '(patient_id)');
CALL AddIndexIfNotExists('appointment', 'idx_appointment_time', '(appointment_time)');
CALL AddIndexIfNotExists('appointment', 'idx_appointment_status', '(status)');

-- Add prescription indexes only if table exists
SET @table_exists = 0;
SELECT COUNT(*) INTO @table_exists 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'prescription';

IF @table_exists = 1 THEN
    CALL AddIndexIfNotExists('prescription', 'idx_prescription_created_at', '(created_at)');
END IF;

-- Drop the helper procedure
DROP PROCEDURE AddIndexIfNotExists;

-- ============================================================================
-- Insert missing sample data (only if tables are empty or have minimal data)
-- ============================================================================

-- Insert additional doctors if doctor table has less than 5 records
SET @doctor_count = (SELECT COUNT(*) FROM doctor);

IF @doctor_count < 5 THEN
    INSERT IGNORE INTO doctor (name, specialty, email, password, phone) VALUES 
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
END IF;

-- Insert doctor available times if the table is empty
SET @available_times_count = (SELECT COUNT(*) FROM doctor_available_times);

IF @available_times_count = 0 THEN
    -- Get the current doctor count for dynamic insertion
    SET @current_doctor_count = (SELECT COUNT(*) FROM doctor);
    
    -- Insert available times for first 5 doctors (or however many exist)
    INSERT INTO doctor_available_times (doctor_id, available_time) 
    SELECT d.id, times.time_slot
    FROM doctor d
    CROSS JOIN (
        SELECT '09:00-10:00' AS time_slot UNION ALL
        SELECT '10:00-11:00' UNION ALL
        SELECT '11:00-12:00' UNION ALL
        SELECT '14:00-15:00' UNION ALL
        SELECT '15:00-16:00' UNION ALL
        SELECT '16:00-17:00'
    ) times
    WHERE d.id <= LEAST(@current_doctor_count, 25)
    ORDER BY d.id, times.time_slot;
END IF;

-- ============================================================================
-- Create or replace views (safe to recreate)
-- ============================================================================

-- Drop existing views if they exist and recreate them
DROP VIEW IF EXISTS appointment_details;
DROP VIEW IF EXISTS prescription_details;
DROP VIEW IF EXISTS doctor_schedule;
DROP VIEW IF EXISTS patient_medication_history;

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

-- Check if prescription table exists before creating prescription views
SET @table_exists = 0;
SELECT COUNT(*) INTO @table_exists 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'smart_clinic_db' 
AND TABLE_NAME = 'prescription';

-- View for prescription details (only if prescription table exists)
SET @sql = IF(@table_exists = 1,
    'CREATE VIEW prescription_details AS
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
    JOIN patient p ON a.patient_id = p.id',
    'SELECT "Prescription table does not exist, skipping prescription_details view" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

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

-- View for patient medication history (only if prescription table exists)
SET @sql = IF(@table_exists = 1,
    'CREATE VIEW patient_medication_history AS
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
    ORDER BY p.name, pr.created_at DESC',
    'SELECT "Prescription table does not exist, skipping patient_medication_history view" AS message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ============================================================================
-- Create stored procedures if they don't exist
-- ============================================================================

DELIMITER //

-- Drop and recreate procedures
DROP PROCEDURE IF EXISTS CheckAppointmentConflict//
DROP PROCEDURE IF EXISTS GetDoctorAvailableSlots//

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
-- Script completion message
-- ============================================================================

SELECT 'Smart Clinic Database ALTER script completed successfully!' AS message,
       'Added missing tables, constraints, indexes, views, and stored procedures.' AS details;
