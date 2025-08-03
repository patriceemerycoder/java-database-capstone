// Connect to the MongoDB database
use yourDatabaseName; // Replace with your actual database name

// Create the doctors collection and insert data
db.doctors.insertMany([
    { email: 'dr.adams@example.com', name: 'Dr. Emily Adams', password: 'pass12345', phone: '555-101-2020', specialty: 'Cardiologist' },
    { email: 'dr.johnson@example.com', name: 'Dr. Mark Johnson', password: 'secure4567', phone: '555-202-3030', specialty: 'Neurologist' },
    { email: 'dr.lee@example.com', name: 'Dr. Sarah Lee', password: 'leePass987', phone: '555-303-4040', specialty: 'Orthopedist' },
    { email: 'dr.wilson@example.com', name: 'Dr. Tom Wilson', password: 'w!ls0nPwd', phone: '555-404-5050', specialty: 'Pediatrician' },
    { email: 'dr.brown@example.com', name: 'Dr. Alice Brown', password: 'brownie123', phone: '555-505-6060', specialty: 'Dermatologist' },
    { email: 'dr.taylor@example.com', name: 'Dr. Taylor Grant', password: 'taylor321', phone: '555-606-7070', specialty: 'Cardiologist' },
    { email: 'dr.white@example.com', name: 'Dr. Sam White', password: 'whiteSecure1', phone: '555-707-8080', specialty: 'Neurologist' },
    { email: 'dr.clark@example.com', name: 'Dr. Emma Clark', password: 'clarkPass456', phone: '555-808-9090', specialty: 'Orthopedist' },
    { email: 'dr.davis@example.com', name: 'Dr. Olivia Davis', password: 'davis789', phone: '555-909-0101', specialty: 'Pediatrician' },
    { email: 'dr.miller@example.com', name: 'Dr. Henry Miller', password: 'millertime!', phone: '555-010-1111', specialty: 'Dermatologist' },
    { email: 'dr.moore@example.com', name: 'Dr. Ella Moore', password: 'ellapass33', phone: '555-111-2222', specialty: 'Cardiologist' },
    { email: 'dr.martin@example.com', name: 'Dr. Leo Martin', password: 'martinpass', phone: '555-222-3333', specialty: 'Neurologist' },
    { email: 'dr.jackson@example.com', name: 'Dr. Ivy Jackson', password: 'jackson11', phone: '555-333-4444', specialty: 'Orthopedist' },
    { email: 'dr.thomas@example.com', name: 'Dr. Owen Thomas', password: 'thomasPWD', phone: '555-444-5555', specialty: 'Pediatrician' },
    { email: 'dr.hall@example.com', name: 'Dr. Ava Hall', password: 'hallhall', phone: '555-555-6666', specialty: 'Dermatologist' },
    { email: 'dr.green@example.com', name: 'Dr. Mia Green', password: 'greenleaf', phone: '555-666-7777', specialty: 'Cardiologist' },
    { email: 'dr.baker@example.com', name: 'Dr. Jack Baker', password: 'bakeitup', phone: '555-777-8888', specialty: 'Neurologist' },
    { email: 'dr.walker@example.com', name: 'Dr. Nora Walker', password: 'walkpass12', phone: '555-888-9999', specialty: 'Orthopedist' },
    { email: 'dr.young@example.com', name: 'Dr. Liam Young', password: 'young123', phone: '555-999-0000', specialty: 'Pediatrician' },
    { email: 'dr.king@example.com', name: 'Dr. Zoe King', password: 'kingkong1', phone: '555-000-1111', specialty: 'Dermatologist' },
    { email: 'dr.scott@example.com', name: 'Dr. Lily Scott', password: 'scottish', phone: '555-111-2223', specialty: 'Cardiologist' },
    { email: 'dr.evans@example.com', name: 'Dr. Lucas Evans', password: 'evansEv1', phone: '555-222-3334', specialty: 'Neurologist' },
    { email: 'dr.turner@example.com', name: 'Dr. Grace Turner', password: 'turnerBurner', phone: '555-333-4445', specialty: 'Orthopedist' },
    { email: 'dr.hill@example.com', name: 'Dr. Ethan Hill', password: 'hillclimb', phone: '555-444-5556', specialty: 'Pediatrician' },
    { email: 'dr.ward@example.com', name: 'Dr. Ruby Ward', password: 'wardWard', phone: '555-555-6667', specialty: 'Dermatologist' }
]);