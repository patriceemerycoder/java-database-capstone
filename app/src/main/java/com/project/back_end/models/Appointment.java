import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Appointment {

    // 1. Unique appointment ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. Doctor reference
    @ManyToOne
    @NotNull
    private Doctor doctor;

    // 3. Patient reference
    @ManyToOne
    @NotNull
    private Patient patient;

    // 4. Scheduled appointment time
    @NotNull
    @Future
    private LocalDateTime appointmentTime;

    // 5. Appointment status: 0 = Scheduled, 1 = Completed
    @NotNull
    private int status;

    // 9. No-argument constructor for JPA
    public Appointment() {}

    // Optional: Parameterized constructor
    public Appointment(Doctor doctor, Patient patient, LocalDateTime appointmentTime, int status) {
        this.doctor = doctor;
        this.patient = patient;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    // 6. Calculate end time (transient, not persisted)
    @Transient
    public LocalDateTime getEndTime() {
        return appointmentTime.plusHours(1);
    }

    // 7. Extract appointment date
    @Transient
    public LocalDate getAppointmentDate() {
        return appointmentTime.toLocalDate();
    }

    // 8. Extract appointment time only
    @Transient
    public LocalTime getAppointmentTimeOnly() {
        return appointmentTime.toLocalTime();
    }

    // 10. Getters and setters
    public Long getId() { return id; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public LocalDateTime getAppointmentTime() { return appointmentTime; }
    public void setAppointmentTime(LocalDateTime appointmentTime) { this.appointmentTime = appointmentTime; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
}