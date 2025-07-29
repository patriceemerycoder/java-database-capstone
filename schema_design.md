# Patient Clinic Project: Unified Database Design
# MySQL Database Design
##  MySQL Tables
 
### 1. `patients`
- `patient_id` INT, PRIMARY KEY, AUTO_INCREMENT
- `full_name` VARCHAR(100), NOT NULL
- `birth_date` DATE, NOT NULL
- `gender` ENUM('M','F'), NOT NULL
- `phone` VARCHAR(20), UNIQUE
- `email` VARCHAR(100), UNIQUE
- `address` TEXT
 
### 2. `doctors`
- `doctor_id` INT, PRIMARY KEY, AUTO_INCREMENT
- `full_name` VARCHAR(100), NOT NULL
- `specialty` VARCHAR(100), NOT NULL
- `phone` VARCHAR(20), UNIQUE
- `email` VARCHAR(100), UNIQUE
 
### 3. `appointments`
- `appointment_id` INT, PRIMARY KEY, AUTO_INCREMENT
- `patient_id` INT, FOREIGN KEY → `patients.patient_id`, NOT NULL
- `doctor_id` INT, FOREIGN KEY → `doctors.doctor_id`, NOT NULL
- `appointment_date` DATETIME, NOT NULL
- `status` ENUM('Scheduled', 'Completed', 'Cancelled'), DEFAULT 'Scheduled'
 
### 4. `admin`
- `admin_id` INT, PRIMARY KEY, AUTO_INCREMENT
- `username` VARCHAR(50), UNIQUE, NOT NULL
- `password_hash` VARCHAR(255), NOT NULL
- `role` ENUM('Admin', 'Staff'), NOT NULL
 
### (Optional) `prescription_logs`
- `prescription_id` VARCHAR(20), PRIMARY KEY
- `patient_id` INT, FOREIGN KEY → `patients.patient_id`, NOT NULL
- `doctor_id` INT, FOREIGN KEY → `doctors.doctor_id`, NOT NULL
- `date_issued` DATETIME, DEFAULT NOW()
- `notes` TEXT
 
---
 
## Stored Procedures
 
### 1. `ValidateEntities`
Checks if both patient and doctor exist.
 
```sql
DELIMITER //
 
CREATE PROCEDURE ValidateEntities(
    IN p_patient_id INT,
    IN p_doctor_id INT
)
BEGIN
    DECLARE patient_exists INT;
    DECLARE doctor_exists INT;
 
    SELECT COUNT(*) INTO patient_exists FROM patients WHERE patient_id = p_patient_id;
    SELECT COUNT(*) INTO doctor_exists FROM doctors WHERE doctor_id = p_doctor_id;
 
    IF patient_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Patient does not exist';
    END IF;
 
    IF doctor_exists = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Doctor does not exist';
    END IF;
END //
 
DELIMITER ;



# MongoDb Collections Design
 
{
  "prescription_id": "RX123456",
  "patient": {
    "id": 101,
    "name": "Jane Doe"
  },
  "doctor": {
    "id": 5001,
    "name": "Dr. Alan Smith",
    "specialty": "Cardiology"
  },
  "date_issued": "2025-07-28T10:00:00Z",
  "medications": [
    {
      "name": "Atenolol",
      "dosage": "50mg",
      "instructions": "Once daily after breakfast"
    },
    {
      "name": "Aspirin",
      "dosage": "75mg",
      "instructions": "Once daily before sleep"
    }
  ],
  "notes": "Patient advised to monitor blood pressure weekly."
}
