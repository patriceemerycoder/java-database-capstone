# Smart Clinic Database Setup - Hybrid Architecture

This project implements a **hybrid database architecture** using both MySQL and MongoDB for different data storage needs.

## Architecture Overview

### MySQL Database (`smart_clinic_db`)
**Purpose**: Relational data with ACID compliance
- **Tables**: `admin`, `patient`, `doctor`, `doctor_available_times`, `appointment`, `prescription`
- **Strengths**: Complex relationships, transactions, reporting, data integrity
- **Use Cases**: User management, appointment scheduling, relational queries

### MongoDB Database (`smart_clinic_prescriptions`)
**Purpose**: Document-based prescription storage with flexible schema
- **Collection**: `prescriptions`
- **Strengths**: Flexible schema, rich metadata, text search, scalability
- **Use Cases**: Prescription documents, medication history, complex medical data

## Database Setup Instructions

### 1. MySQL Setup

```bash
# Connect to MySQL
mysql -u root -p

# Run the main database creation script
source create_smart_clinic_database.sql;

# Or run the ALTER script if database already exists
source alter_smart_clinic_database.sql;
```

### 2. MongoDB Setup

```bash
# Start MongoDB service
mongod

# Connect to MongoDB and run setup script
mongosh "mongodb://localhost:27017/smart_clinic_prescriptions" setup_mongodb_prescriptions.js
```

## Data Synchronization

The two databases are linked via the `appointmentId` field:

### MySQL → MongoDB Relationship
```sql
-- MySQL appointment table
SELECT id, doctor_id, patient_id, appointment_time FROM appointment WHERE id = 51;
```

```javascript
// MongoDB prescription document
{
  "_id": ObjectId("6807dd712725f013281e7201"),
  "appointmentId": 51,  // References MySQL appointment.id
  "patientName": "John Smith",
  "medication": "Paracetamol",
  // ... other fields
}
```

## Common Query Patterns

### MySQL Queries

```sql
-- Get appointment details
SELECT * FROM appointment_details WHERE appointment_id = 51;

-- Get patient appointments
SELECT * FROM appointment WHERE patient_id = 1;

-- Get doctor schedule
SELECT * FROM doctor_schedule WHERE doctor_id = 1;

-- Get MySQL prescription data
SELECT * FROM prescription_details WHERE appointment_id = 51;
```

### MongoDB Queries

```javascript
// Get prescriptions by patient
db.prescriptions.find({ "patientName": "John Smith" });

// Get prescriptions by appointment
db.prescriptions.find({ "appointmentId": 51 });

// Search medications
db.prescriptions.find({ "medication": /Paracetamol/i });

// Text search in prescriptions
db.prescriptions.find({ $text: { $search: "tablet morning" } });

// Aggregate prescription statistics
db.prescriptions.aggregate([
  { $group: { _id: "$medication", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
```

### Cross-Database Queries (Application Level)

```java
// Example Spring Boot service combining both databases
@Service
public class PrescriptionService {
    
    @Autowired
    private AppointmentRepository appointmentRepo; // MySQL
    
    @Autowired
    private MongoTemplate mongoTemplate; // MongoDB
    
    public PrescriptionDetailView getPrescriptionWithAppointment(String prescriptionId) {
        // Get prescription from MongoDB
        Prescription prescription = mongoTemplate.findById(prescriptionId, Prescription.class);
        
        // Get appointment details from MySQL
        Appointment appointment = appointmentRepo.findById(prescription.getAppointmentId());
        
        // Combine data for response
        return new PrescriptionDetailView(prescription, appointment);
    }
}
```

## Benefits of Hybrid Architecture

### MySQL Benefits
- **ACID Transactions**: Reliable for critical operations
- **Complex Joins**: Efficient relational queries
- **Data Integrity**: Foreign key constraints
- **Mature Tooling**: Extensive ecosystem

### MongoDB Benefits
- **Flexible Schema**: Easy to add new prescription fields
- **Rich Documents**: Store complex medication data structures
- **Text Search**: Full-text search across prescription notes
- **Horizontal Scaling**: Better for large prescription datasets

## Application Configuration

### Spring Boot `application.properties`

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/smart_clinic_db
spring.datasource.username=clinic_app
spring.datasource.password=secure_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/smart_clinic_prescriptions
spring.data.mongodb.auto-index-creation=true
```

### Dependencies in `pom.xml`

```xml
<!-- MySQL -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- MongoDB -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

## Best Practices

### Data Consistency
1. **Always create MySQL appointment first** before MongoDB prescription
2. **Use application-level transactions** when creating both records
3. **Implement cleanup procedures** for orphaned MongoDB documents

### Performance Optimization
1. **Use MongoDB for prescription search** (text search, aggregations)
2. **Use MySQL for appointment queries** (relational data, reporting)
3. **Cache frequently accessed data** at application level

### Backup Strategy
1. **MySQL**: Regular SQL dumps with point-in-time recovery
2. **MongoDB**: Replica sets with automated backups
3. **Cross-reference validation**: Periodic sync checks

## File Structure

```
java-database-capstone/
├── create_smart_clinic_database.sql      # MySQL database creation
├── alter_smart_clinic_database.sql       # MySQL database alterations
├── setup_mongodb_prescriptions.js        # MongoDB setup script
└── README.md                             # This documentation
```

## Troubleshooting

### Common Issues

1. **appointmentId mismatch**: Ensure MySQL appointment exists before creating MongoDB prescription
2. **Connection timeouts**: Check both MySQL and MongoDB services are running
3. **Index performance**: Run `EXPLAIN` in MySQL and `explain()` in MongoDB for slow queries

### Validation Commands

```sql
-- Check MySQL data integrity
SELECT COUNT(*) FROM appointment;
SELECT COUNT(*) FROM prescription;
```

```javascript
// Check MongoDB data integrity
db.prescriptions.countDocuments();
db.prescriptions.distinct("appointmentId").length;
```

---

This hybrid architecture provides the best of both worlds: relational integrity from MySQL and document flexibility from MongoDB, perfectly suited for a healthcare application with complex data requirements.