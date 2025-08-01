package com.project.back_end.services;

import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.models.Patient;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final ValidationService validationService;
    private final TokenService tokenService;

    // Constructor injection for all dependencies
    public AppointmentService(AppointmentRepository appointmentRepository,
                            PatientRepository patientRepository,
                            DoctorRepository doctorRepository,
                            ValidationService validationService,
                            TokenService tokenService) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.validationService = validationService;
        this.tokenService = tokenService;
    }

    /**
     * Book a new appointment
     * @param appointment The appointment to be booked
     * @return 1 if successful, 0 if failed
     */
    @Transactional
    public int bookAppointment(Appointment appointment) {
        try {
            // Validate that the doctor exists
            Optional<Doctor> doctor = doctorRepository.findById(appointment.getDoctor().getId());
            if (!doctor.isPresent()) {
                return 0;
            }

            // Validate that the patient exists
            Optional<Patient> patient = patientRepository.findById(appointment.getPatient().getId());
            if (!patient.isPresent()) {
                return 0;
            }

            // Check if the doctor is available at the requested time
            LocalDateTime startTime = appointment.getAppointmentTime();
            LocalDateTime endTime = startTime.plusHours(1);
            
            List<Appointment> conflictingAppointments = appointmentRepository
                .findByDoctorIdAndAppointmentTimeBetween(
                    appointment.getDoctor().getId(), 
                    startTime.minusMinutes(30), 
                    endTime.plusMinutes(30)
                );

            if (!conflictingAppointments.isEmpty()) {
                return 0; // Doctor not available
            }

            // Set appointment status to scheduled (0)
            appointment.setStatus(0);
            
            // Save the appointment
            appointmentRepository.save(appointment);
            return 1;
import com.project.back_end.services.TokenService; // Added import for TokenService
        } catch (Exception e) {
            return 0;
        }
    }

    /**
     * Update an existing appointment
     * @param appointmentId The ID of the appointment to update
     * @param updatedAppointment The updated appointment data
     * @param patientId The ID of the patient requesting the update
     * @return ResponseEntity with success or error message
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> updateAppointment(Long appointmentId, 
                                                               Appointment updatedAppointment, 
                                                               Long patientId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Find the existing appointment
            Optional<Appointment> existingAppointmentOpt = appointmentRepository.findById(appointmentId);
            if (!existingAppointmentOpt.isPresent()) {
                response.put("message", "Appointment not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Appointment existingAppointment = existingAppointmentOpt.get();

            // Validate that the patient owns this appointment
            if (!existingAppointment.getPatient().getId().equals(patientId)) {
                response.put("message", "Unauthorized: You can only update your own appointments");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Check if appointment is still scheduled (status = 0)
            if (existingAppointment.getStatus() != 0) {
                response.put("message", "Cannot update completed or cancelled appointments");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Validate the new appointment time doesn't conflict with doctor's schedule
            LocalDateTime newStartTime = updatedAppointment.getAppointmentTime();
            LocalDateTime newEndTime = newStartTime.plusHours(1);
            
            List<Appointment> conflictingAppointments = appointmentRepository
                .findByDoctorIdAndAppointmentTimeBetween(
                    existingAppointment.getDoctor().getId(),
                    newStartTime.minusMinutes(30),
                    newEndTime.plusMinutes(30)
                );

            // Remove the current appointment from conflicts check
            conflictingAppointments.removeIf(apt -> apt.getId().equals(appointmentId));

            if (!conflictingAppointments.isEmpty()) {
                response.put("message", "Doctor is not available at the requested time");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            // Update the appointment
            existingAppointment.setAppointmentTime(updatedAppointment.getAppointmentTime());
            appointmentRepository.save(existingAppointment);

            response.put("message", "Appointment updated successfully");
            response.put("appointment", existingAppointment);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Error updating appointment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Cancel an appointment
     * @param appointmentId The ID of the appointment to cancel
     * @param patientId The ID of the patient requesting cancellation
     * @return ResponseEntity with success or error message
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> cancelAppointment(Long appointmentId, Long patientId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Find the appointment
            Optional<Appointment> appointmentOpt = appointmentRepository.findById(appointmentId);
            if (!appointmentOpt.isPresent()) {
                response.put("message", "Appointment not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Appointment appointment = appointmentOpt.get();

            // Validate that the patient owns this appointment
            if (!appointment.getPatient().getId().equals(patientId)) {
                response.put("message", "Unauthorized: You can only cancel your own appointments");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Check if appointment can be cancelled (only scheduled appointments)
            if (appointment.getStatus() != 0) {
                response.put("message", "Cannot cancel completed or already cancelled appointments");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Delete the appointment
            appointmentRepository.delete(appointment);

            response.put("message", "Appointment cancelled successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Error cancelling appointment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Get appointments for a specific doctor on a particular day, optionally filtered by patient name
     * @param doctorId The ID of the doctor
     * @param date The date to retrieve appointments for
     * @param patientName Optional patient name filter
     * @return ResponseEntity with list of appointments
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> getAppointments(Long doctorId, String date, String patientName) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate doctor exists
            Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
            if (!doctorOpt.isPresent()) {
                response.put("message", "Doctor not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Parse the date
            LocalDate appointmentDate = LocalDate.parse(date, DateTimeFormatter.ISO_LOCAL_DATE);
            LocalDateTime startOfDay = appointmentDate.atStartOfDay();
            LocalDateTime endOfDay = appointmentDate.atTime(23, 59, 59);

            List<Appointment> appointments;

            if (patientName != null && !patientName.trim().isEmpty()) {
                // Filter by patient name
                appointments = appointmentRepository
                    .findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
                        doctorId, patientName.trim(), startOfDay, endOfDay
                    );
            } else {
                // Get all appointments for the doctor on the specified date
                appointments = appointmentRepository
                    .findByDoctorIdAndAppointmentTimeBetween(doctorId, startOfDay, endOfDay);
            }

            response.put("appointments", appointments);
            response.put("message", "Appointments retrieved successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Error retrieving appointments: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Change the status of an appointment
     * @param appointmentId The ID of the appointment
     * @param newStatus The new status (0 = Scheduled, 1 = Completed)
     * @return ResponseEntity with success or error message
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> changeStatus(Long appointmentId, int newStatus) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Find the appointment
            Optional<Appointment> appointmentOpt = appointmentRepository.findById(appointmentId);
            if (!appointmentOpt.isPresent()) {
                response.put("message", "Appointment not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Appointment appointment = appointmentOpt.get();

            // Validate status value
            if (newStatus < 0 || newStatus > 1) {
                response.put("message", "Invalid status value. Use 0 for Scheduled, 1 for Completed");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Update the status
            appointment.setStatus(newStatus);
            appointmentRepository.save(appointment);

            String statusText = newStatus == 0 ? "Scheduled" : "Completed";
            response.put("message", "Appointment status updated to " + statusText);
            response.put("appointment", appointment);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("message", "Error updating appointment status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Get all appointments for a specific patient
     * @param patientId The ID of the patient
     * @return List of appointments for the patient
     */
    @Transactional(readOnly = true)
    public List<Appointment> getPatientAppointments(Long patientId) {
        return appointmentRepository.findByPatientIdOrderByAppointmentTimeDesc(patientId);
    }

    /**
     * Get all appointments for a specific doctor
     * @param doctorId The ID of the doctor
     * @return List of appointments for the doctor
     */
    @Transactional(readOnly = true)
    public List<Appointment> getDoctorAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorIdOrderByAppointmentTimeDesc(doctorId);
    }
}
