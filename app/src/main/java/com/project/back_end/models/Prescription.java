import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;

@Document(collection = "prescriptions") // Marks this as a MongoDB document
public class Prescription {

    // 1. Unique identifier stored as a string
    @Id
    private String id;

    // 2. Patient name with validation for length and nullability
    @NotNull
    @Size(min = 3, max = 100)
    private String patientName;

    // 3. Associated appointment ID
    @NotNull
    private Long appointmentId;

    // 4. Medication name with size constraint
    @NotNull
    @Size(min = 3, max = 100)
    private String medication;

    // 5. Dosage information
    @NotNull
    private String dosage;

    // 6. Optional doctor's notes with max length
    @Size(max = 200)
    private String doctorNotes;

    // 7. No-argument constructor for framework use
    public Prescription() {}

    // Parameterized constructor for convenience
    public Prescription(String patientName, Long appointmentId, String medication, String dosage, String doctorNotes) {
        this.patientName = patientName;
        this.appointmentId = appointmentId;
        this.medication = medication;
        this.dosage = dosage;
        this.doctorNotes = doctorNotes;
    }

    // 8. Getters and setters
    public String getId() { return id; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Long getAppointmentId() { return appointmentId; }
    public void setAppointmentId(Long appointmentId) { this.appointmentId = appointmentId; }

    public String getMedication() { return medication; }
    public void setMedication(String medication) { this.medication = medication; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }
}