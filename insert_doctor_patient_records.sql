INSERT INTO doctor (id, name, email, specialty, phone) VALUES
(1, 'Dr. Sarah Johnson', 'sarah.johnson@smartclinic.com', 'Cardiology', '555-0101'),
(2, 'Dr. Michael Chen', 'michael.chen@smartclinic.com', 'Pediatrics', '555-0102'),
(3, 'Dr. Emily Rodriguez', 'emily.rodriguez@smartclinic.com', 'Dermatology', '555-0103'),
(4, 'Dr. David Thompson', 'david.thompson@smartclinic.com', 'Orthopedics', '555-0104'),
(5, 'Dr. Lisa Park', 'lisa.park@smartclinic.com', 'Neurology', '555-0105');

INSERT INTO patient (id, name, email, phone, address, date_of_birth) VALUES
(1, 'John Smith', 'john.smith@email.com', '555-1001', '123 Main St, City, State', '1985-03-15'),
(2, 'Maria Garcia', 'maria.garcia@email.com', '555-1002', '456 Oak Ave, City, State', '1990-07-22'),
(3, 'Robert Wilson', 'robert.wilson@email.com', '555-1003', '789 Pine Rd, City, State', '1978-11-08'),
(4, 'Jennifer Davis', 'jennifer.davis@email.com', '555-1004', '321 Elm St, City, State', '1992-05-14'),
(5, 'Michael Brown', 'michael.brown@email.com', '555-1005', '654 Maple Dr, City, State', '1988-09-30'),
(6, 'Sarah Miller', 'sarah.miller@email.com', '555-1006', '987 Cedar Ln, City, State', '1995-12-03'),
(7, 'James Taylor', 'james.taylor@email.com', '555-1007', '147 Birch St, City, State', '1983-01-19'),
(8, 'Ashley Anderson', 'ashley.anderson@email.com', '555-1008', '258 Spruce Ave, City, State', '1991-04-27');


INSERT INTO appointment (id, doctor_id, patient_id, appointment_time, status, notes) VALUES
-- Today's appointments (2025-07-31)
(1, 1, 1, '2025-07-31 09:00:00', 'Scheduled', 'Regular cardiac checkup'),
(2, 1, 3, '2025-07-31 10:30:00', 'Completed', 'Follow-up visit'),
(3, 2, 2, '2025-07-31 08:30:00', 'Scheduled', 'Child wellness exam'),
(4, 2, 4, '2025-07-31 11:00:00', 'In Progress', 'Vaccination appointment'),
(5, 3, 5, '2025-07-31 14:00:00', 'Scheduled', 'Skin condition consultation'),
(6, 3, 6, '2025-07-31 15:30:00', 'Cancelled', 'Patient cancelled'),
(7, 4, 7, '2025-07-31 13:00:00', 'Completed', 'Knee pain evaluation'),
(8, 5, 8, '2025-07-31 16:00:00', 'Scheduled', 'Headache consultation'),

-- Tomorrow's appointments (2025-08-01)
(9, 1, 2, '2025-08-01 09:30:00', 'Scheduled', 'Heart rhythm check'),
(10, 2, 1, '2025-08-01 10:00:00', 'Scheduled', 'Annual physical'),
(11, 3, 3, '2025-08-01 11:30:00', 'Scheduled', 'Mole examination'),
(12, 4, 4, '2025-08-01 14:30:00', 'Scheduled', 'Sports injury follow-up'),
(13, 5, 5, '2025-08-01 15:00:00', 'Scheduled', 'Migraine treatment'),

-- Previous day appointments (2025-07-30)
(14, 1, 6, '2025-07-30 10:00:00', 'Completed', 'Blood pressure check'),
(15, 2, 7, '2025-07-30 11:30:00', 'Completed', 'Child immunization'),
(16, 3, 8, '2025-07-30 14:00:00', 'No Show', 'Patient did not show up'),
(17, 4, 1, '2025-07-30 15:30:00', 'Completed', 'Back pain treatment'),
(18, 5, 2, '2025-07-30 16:00:00', 'Completed', 'Neurological assessment');