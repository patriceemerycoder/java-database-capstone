
-- Insert sample doctors
INSERT INTO doctor (name, specialty) VALUES
('Dr. Alice Smith', 'Cardiology'),
('Dr. Bob Jones', 'Dermatology'),
('Dr. Carol Lee', 'Pediatrics');

-- Insert sample patients
INSERT INTO patient (name, dob) VALUES
('John Doe', '1980-01-01'),
('Jane Roe', '1990-02-02'),
('Sam Brown', '2000-03-03');

-- Insert sample appointments (for today and other days)
INSERT INTO appointment (doctor_id, patient_id, appointment_date, appointment_time, status) VALUES
(1, 1, CURDATE(), '09:00:00', 'Completed'),
(1, 2, CURDATE(), '10:00:00', 'Scheduled'),
(2, 3, CURDATE(), '11:00:00', 'Scheduled'),
(3, 1, CURDATE() - INTERVAL 1 DAY, '14:00:00', 'Completed'),
(2, 2, CURDATE(), '15:00:00', 'Cancelled');