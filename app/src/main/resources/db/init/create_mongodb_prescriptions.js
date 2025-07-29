// ============================================================================
// Smart Clinic MongoDB Prescriptions Database Setup Script
// Creates prescriptions collection with sample data for hybrid architecture
// ============================================================================

// Switch to or create the prescriptions database
use prescriptions_db;

// Drop the prescriptions collection if it exists (for clean recreation)
db.prescriptions.drop();

// Create the prescriptions collection with validation schema
db.createCollection("prescriptions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["patientName", "appointmentId", "medication", "dosage"],
      properties: {
        _id: {
          bsonType: "objectId"
        },
        patientName: {
          bsonType: "string",
          minLength: 3,
          description: "Patient name must be a string with at least 3 characters"
        },
        appointmentId: {
          bsonType: "int",
          minimum: 1,
          description: "Appointment ID must be a positive integer"
        },
        medication: {
          bsonType: "string",
          minLength: 3,
          description: "Medication must be a string with at least 3 characters"
        },
        dosage: {
          bsonType: "string",
          minLength: 1,
          description: "Dosage must be a non-empty string"
        },
        doctorNotes: {
          bsonType: ["string", "null"],
          maxLength: 200,
          description: "Doctor notes must be a string with max 200 characters or null"
        },
        _class: {
          bsonType: "string",
          description: "Spring Data MongoDB class information"
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

// Insert sample prescription data
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

// Create indexes for better query performance
db.prescriptions.createIndex({ "appointmentId": 1 });
db.prescriptions.createIndex({ "patientName": 1 });
db.prescriptions.createIndex({ "medication": 1 });
db.prescriptions.createIndex({ "createdAt": -1 });
db.prescriptions.createIndex({ "patientName": 1, "createdAt": -1 });

// Verify the collection was created successfully
print("=== Prescriptions Collection Setup Complete ===");
print("Database: " + db.getName());
print("Collection count: " + db.prescriptions.countDocuments());
print("Sample document:");
printjson(db.prescriptions.findOne());

// Show all indexes created
print("\nIndexes created:");
db.prescriptions.getIndexes().forEach(function(index) {
    print("- " + JSON.stringify(index.key));
});

print("\n=== MongoDB Prescriptions Database Setup Complete! ===");
