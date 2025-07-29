// ============================================================================
// Smart Clinic MongoDB Prescription Setup Script
// Hybrid Database Approach: MySQL + MongoDB for Prescriptions
// ============================================================================

// Connect to MongoDB (adjust connection string as needed)
// Run this script with: mongosh "mongodb://localhost:27017/smart_clinic_prescriptions" setup_mongodb_prescriptions.js

// Create database and collection
use smart_clinic_prescriptions;

// Drop existing collection if it exists (for clean setup)
db.prescriptions.drop();

// Create prescriptions collection with validation schema
db.createCollection("prescriptions", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["patientName", "appointmentId", "medication", "dosage"],
         properties: {
            _id: {
               bsonType: "objectId",
               description: "Unique identifier for the prescription"
            },
            patientName: {
               bsonType: "string",
               minLength: 3,
               description: "Patient name must be a string with minimum 3 characters"
            },
            appointmentId: {
               bsonType: "int",
               minimum: 1,
               description: "Appointment ID must be a positive integer referencing MySQL appointment.id"
            },
            medication: {
               bsonType: "string",
               minLength: 3,
               description: "Medication name must be a string with minimum 3 characters"
            },
            dosage: {
               bsonType: "string",
               minLength: 1,
               description: "Dosage must be a non-empty string"
            },
            doctorNotes: {
               bsonType: ["string", "null"],
               maxLength: 200,
               description: "Optional doctor notes, maximum 200 characters"
            },
            _class: {
               bsonType: "string",
               description: "Java class name for Spring Data mapping"
            },
            createdAt: {
               bsonType: "date",
               description: "Creation timestamp"
            },
            updatedAt: {
               bsonType: "date",
               description: "Last update timestamp"
            }
         }
      }
   }
});

// Insert sample prescription data with proper ObjectIds and timestamps
db.prescriptions.insertMany([
  {
    "_id": ObjectId("6807dd712725f013281e7201"),
    "patientName": "John Smith",
    "appointmentId": 51,
    "medication": "Paracetamol",
    "dosage": "500mg",
    "doctorNotes": "Take 1 tablet every 6 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7202"),
    "patientName": "Emily Rose",
    "appointmentId": 52,
    "medication": "Aspirin",
    "dosage": "300mg",
    "doctorNotes": "Take 1 tablet after meals.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7203"),
    "patientName": "Michael Jordan",
    "appointmentId": 53,
    "medication": "Ibuprofen",
    "dosage": "400mg",
    "doctorNotes": "Take 1 tablet every 8 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7204"),
    "patientName": "Olivia Moon",
    "appointmentId": 54,
    "medication": "Antihistamine",
    "dosage": "10mg",
    "doctorNotes": "Take 1 tablet daily before bed.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7205"),
    "patientName": "Liam King",
    "appointmentId": 55,
    "medication": "Vitamin C",
    "dosage": "1000mg",
    "doctorNotes": "Take 1 tablet daily.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7206"),
    "patientName": "Sophia Lane",
    "appointmentId": 56,
    "medication": "Antibiotics",
    "dosage": "500mg",
    "doctorNotes": "Take 1 tablet every 12 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7207"),
    "patientName": "Noah Brooks",
    "appointmentId": 57,
    "medication": "Paracetamol",
    "dosage": "500mg",
    "doctorNotes": "Take 1 tablet every 6 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7208"),
    "patientName": "Ava Daniels",
    "appointmentId": 58,
    "medication": "Ibuprofen",
    "dosage": "200mg",
    "doctorNotes": "Take 1 tablet every 8 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7209"),
    "patientName": "William Harris",
    "appointmentId": 59,
    "medication": "Aspirin",
    "dosage": "300mg",
    "doctorNotes": "Take 1 tablet after meals.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7210"),
    "patientName": "Mia Green",
    "appointmentId": 60,
    "medication": "Vitamin D",
    "dosage": "1000 IU",
    "doctorNotes": "Take 1 tablet daily with food.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7211"),
    "patientName": "James Brown",
    "appointmentId": 61,
    "medication": "Antihistamine",
    "dosage": "10mg",
    "doctorNotes": "Take 1 tablet every morning.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7212"),
    "patientName": "Amelia Clark",
    "appointmentId": 62,
    "medication": "Paracetamol",
    "dosage": "500mg",
    "doctorNotes": "Take 1 tablet every 6 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7213"),
    "patientName": "Ben Johnson",
    "appointmentId": 63,
    "medication": "Ibuprofen",
    "dosage": "400mg",
    "doctorNotes": "Take 1 tablet every 8 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7214"),
    "patientName": "Ella Monroe",
    "appointmentId": 64,
    "medication": "Vitamin C",
    "dosage": "1000mg",
    "doctorNotes": "Take 1 tablet daily.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7215"),
    "patientName": "Lucas Turner",
    "appointmentId": 65,
    "medication": "Aspirin",
    "dosage": "300mg",
    "doctorNotes": "Take 1 tablet after meals.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7216"),
    "patientName": "Grace Scott",
    "appointmentId": 66,
    "medication": "Paracetamol",
    "dosage": "500mg",
    "doctorNotes": "Take 1 tablet every 6 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7217"),
    "patientName": "Ethan Hill",
    "appointmentId": 67,
    "medication": "Ibuprofen",
    "dosage": "400mg",
    "doctorNotes": "Take 1 tablet every 8 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7218"),
    "patientName": "Ruby Ward",
    "appointmentId": 68,
    "medication": "Vitamin D",
    "dosage": "1000 IU",
    "doctorNotes": "Take 1 tablet daily with food.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7219"),
    "patientName": "Jack Baker",
    "appointmentId": 69,
    "medication": "Antibiotics",
    "dosage": "500mg",
    "doctorNotes": "Take 1 tablet every 12 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7220"),
    "patientName": "Mia Hall",
    "appointmentId": 70,
    "medication": "Paracetamol",
    "dosage": "500mg",
    "doctorNotes": "Take 1 tablet every 6 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7221"),
    "patientName": "Owen Thomas",
    "appointmentId": 71,
    "medication": "Ibuprofen",
    "dosage": "200mg",
    "doctorNotes": "Take 1 tablet every 8 hours.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7222"),
    "patientName": "Ivy Jackson",
    "appointmentId": 72,
    "medication": "Antihistamine",
    "dosage": "10mg",
    "doctorNotes": "Take 1 tablet every morning.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7223"),
    "patientName": "Leo Martin",
    "appointmentId": 73,
    "medication": "Vitamin C",
    "dosage": "1000mg",
    "doctorNotes": "Take 1 tablet daily.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  },
  {
    "_id": ObjectId("6807dd712725f013281e7224"),
    "patientName": "Ella Moore",
    "appointmentId": 74,
    "medication": "Aspirin",
    "dosage": "300mg",
    "doctorNotes": "Take 1 tablet after meals.",
    "_class": "com.project.back_end.models.Prescription",
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]);

// Create indexes for better performance
db.prescriptions.createIndex({ "appointmentId": 1 }, { name: "idx_appointment_id" });
db.prescriptions.createIndex({ "patientName": 1 }, { name: "idx_patient_name" });
db.prescriptions.createIndex({ "medication": 1 }, { name: "idx_medication" });
db.prescriptions.createIndex({ "createdAt": 1 }, { name: "idx_created_at" });
db.prescriptions.createIndex({ "appointmentId": 1, "patientName": 1 }, { name: "idx_appointment_patient" });

// Create a compound text index for search functionality
db.prescriptions.createIndex({ 
  "patientName": "text", 
  "medication": "text", 
  "doctorNotes": "text" 
}, { name: "idx_text_search" });

// Verify the setup
print("MongoDB Prescription Database Setup Complete!");
print("Database: smart_clinic_prescriptions");
print("Collection: prescriptions");
print("Total documents inserted: " + db.prescriptions.countDocuments());

// Display sample queries
print("\n=== Sample Queries ===");

print("\n1. Find prescriptions by patient name:");
print("db.prescriptions.find({ 'patientName': 'John Smith' })");

print("\n2. Find prescriptions by appointment ID:");
print("db.prescriptions.find({ 'appointmentId': 51 })");

print("\n3. Search prescriptions by medication:");
print("db.prescriptions.find({ 'medication': /Paracetamol/i })");

print("\n4. Find prescriptions with text search:");
print("db.prescriptions.find({ $text: { $search: 'tablet morning' } })");

print("\n5. Get prescription count by medication:");
print("db.prescriptions.aggregate([");
print("  { $group: { _id: '$medication', count: { $sum: 1 } } },");
print("  { $sort: { count: -1 } }");
print("])");

print("\n6. Find recent prescriptions (last 30 days):");
print("db.prescriptions.find({ 'createdAt': { $gte: new Date(Date.now() - 30*24*60*60*1000) } })");

// Show validation examples
print("\n=== Data Validation Examples ===");
print("The collection enforces:");
print("- patientName: minimum 3 characters");
print("- appointmentId: positive integer");
print("- medication: minimum 3 characters");
print("- dosage: non-empty string");
print("- doctorNotes: optional, maximum 200 characters");

// Show indexes created
print("\n=== Indexes Created ===");
db.prescriptions.getIndexes().forEach(function(index) {
    print("- " + index.name + ": " + JSON.stringify(index.key));
});

print("\n=== Hybrid Database Architecture Notes ===");
print("MySQL: Stores relational data (patients, doctors, appointments)");
print("MongoDB: Stores prescription documents with rich metadata");
print("appointmentId: Links MongoDB prescriptions to MySQL appointments");
print("Synchronization: Ensure appointmentId exists in MySQL before creating MongoDB prescription");
