package com.project.back_end.services;

import com.project.back_end.models.Doctor;
import com.project.back_end.models.AvailableTime;
import com.project.back_end.repo.DoctorRepository;
import com.project.back_end.repo.AppointmentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService;
    private final com.project.back_end.services.Service serviceUtils;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository, 
                        AppointmentRepository appointmentRepository,
                        TokenService tokenService,
                        com.project.back_end.services.Service serviceUtils) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.tokenService = tokenService;
        this.serviceUtils = serviceUtils;
    }

    /**
     * Get doctor availability based on their available times
     * @param doctorId the ID of the doctor
     * @return ResponseEntity with doctor availability information
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> getDoctorAvailability(Long doctorId) {
        try {
            Optional<Doctor> doctorOpt = doctorRepository.findByIdWithAvailableTimes(doctorId);
            
            if (doctorOpt.isEmpty()) {
                return serviceUtils.createErrorResponse("Doctor not found", HttpStatus.NOT_FOUND);
            }
            
            Doctor doctor = doctorOpt.get();
            List<AvailableTime> availableTimes = doctor.getAvailableTimes();
            
            Map<String, Object> availability = Map.of(
                "doctorId", doctor.getId(),
                "doctorName", doctor.getName(),
                "specialty", doctor.getSpecialty(),
                "availableTimes", availableTimes
            );
            
            return serviceUtils.createSuccessResponse("Doctor availability retrieved successfully", availability);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error retrieving doctor availability: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Save a new doctor
     * @param doctor the doctor to save
     * @return ResponseEntity with the saved doctor
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> saveDoctor(Doctor doctor) {
        try {
            // Validate doctor data
            if (doctor.getName() == null || doctor.getName().trim().isEmpty()) {
                return serviceUtils.createErrorResponse("Doctor name is required", HttpStatus.BAD_REQUEST);
            }
            
            if (doctor.getEmail() == null || doctor.getEmail().trim().isEmpty()) {
                return serviceUtils.createErrorResponse("Doctor email is required", HttpStatus.BAD_REQUEST);
            }
            
            if (doctor.getSpecialty() == null || doctor.getSpecialty().trim().isEmpty()) {
                return serviceUtils.createErrorResponse("Doctor specialty is required", HttpStatus.BAD_REQUEST);
            }
            
            // Check if email already exists
            Optional<Doctor> existingDoctor = doctorRepository.findByEmail(doctor.getEmail());
            if (existingDoctor.isPresent()) {
                return serviceUtils.createErrorResponse("Doctor with this email already exists", HttpStatus.CONFLICT);
            }
            
            Doctor savedDoctor = doctorRepository.save(doctor);
            return serviceUtils.createSuccessResponse("Doctor saved successfully", savedDoctor);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error saving doctor: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing doctor
     * @param doctor the doctor with updated information
     * @return ResponseEntity with the updated doctor
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> updateDoctor(Doctor doctor) {
        try {
            if (doctor.getId() == null) {
                return serviceUtils.createErrorResponse("Doctor ID is required for update", HttpStatus.BAD_REQUEST);
            }
            
            Optional<Doctor> existingDoctorOpt = doctorRepository.findById(doctor.getId());
            if (existingDoctorOpt.isEmpty()) {
                return serviceUtils.createErrorResponse("Doctor not found", HttpStatus.NOT_FOUND);
            }
            
            Doctor existingDoctor = existingDoctorOpt.get();
            
            // Update fields if provided
            if (doctor.getName() != null && !doctor.getName().trim().isEmpty()) {
                existingDoctor.setName(doctor.getName());
            }
            if (doctor.getSpecialty() != null && !doctor.getSpecialty().trim().isEmpty()) {
                existingDoctor.setSpecialty(doctor.getSpecialty());
            }
            if (doctor.getEmail() != null && !doctor.getEmail().trim().isEmpty()) {
                // Check if new email already exists for another doctor
                Optional<Doctor> doctorWithEmail = doctorRepository.findByEmail(doctor.getEmail());
                if (doctorWithEmail.isPresent() && !doctorWithEmail.get().getId().equals(doctor.getId())) {
                    return serviceUtils.createErrorResponse("Email already exists for another doctor", HttpStatus.CONFLICT);
                }
                existingDoctor.setEmail(doctor.getEmail());
            }
            
            Doctor updatedDoctor = doctorRepository.save(existingDoctor);
            return serviceUtils.createSuccessResponse("Doctor updated successfully", updatedDoctor);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error updating doctor: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all doctors with their available times
     * @return ResponseEntity with list of doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> getDoctors() {
        try {
            List<Doctor> doctors = doctorRepository.findAllWithAvailableTimes();
            return serviceUtils.createSuccessResponse("Doctors retrieved successfully", doctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error retrieving doctors: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a doctor by ID
     * @param id the ID of the doctor to delete
     * @return ResponseEntity with deletion status
     */
    @Transactional
    public ResponseEntity<Map<String, Object>> deleteDoctor(Long id) {
        try {
            if (!doctorRepository.existsById(id)) {
                return serviceUtils.createErrorResponse("Doctor not found", HttpStatus.NOT_FOUND);
            }
            
            // Check if doctor has any appointments
            boolean hasAppointments = appointmentRepository.existsByDoctorId(id);
            if (hasAppointments) {
                return serviceUtils.createErrorResponse("Cannot delete doctor with existing appointments", 
                                                      HttpStatus.CONFLICT);
            }
            
            doctorRepository.deleteById(id);
            return serviceUtils.createSuccessResponse("Doctor deleted successfully", null);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error deleting doctor: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Validate doctor credentials
     * @param email the doctor's email
     * @param password the doctor's password
     * @return ResponseEntity with validation result
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> validateDoctor(String email, String password) {
        try {
            Optional<Doctor> doctorOpt = doctorRepository.findByEmail(email);
            
            if (doctorOpt.isEmpty()) {
                return serviceUtils.createErrorResponse("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
            
            Doctor doctor = doctorOpt.get();
            
            // Validate password (assuming password is stored in the doctor entity)
            if (!doctor.getPassword().equals(password)) {
                return serviceUtils.createErrorResponse("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
            
            // Generate token for authenticated doctor
            String token = tokenService.generateToken(doctor.getEmail(), "DOCTOR");
            
            Map<String, Object> response = Map.of(
                "doctor", doctor,
                "token", token,
                "role", "DOCTOR"
            );
            
            return serviceUtils.createSuccessResponse("Doctor authenticated successfully", response);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error validating doctor: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Find doctor by name
     * @param name the name to search for
     * @return ResponseEntity with matching doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> findDoctorByName(String name) {
        try {
            if (name == null || name.trim().isEmpty()) {
                return serviceUtils.createErrorResponse("Name parameter is required", HttpStatus.BAD_REQUEST);
            }
            
            List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCase(name.trim());
            return serviceUtils.createSuccessResponse("Doctors found successfully", doctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error finding doctor by name: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Filter doctors by name, specialty, and time
     * @param name the name pattern
     * @param specialty the specialty
     * @param time the time period (AM/PM)
     * @return ResponseEntity with filtered doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> filterDoctorsByNameSpecialtyAndTime(String name, String specialty, String time) {
        try {
            List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specialty);
            List<Doctor> filteredDoctors = filterDoctorsByTime(doctors, time);
            
            return serviceUtils.createSuccessResponse("Doctors filtered successfully", filteredDoctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error filtering doctors: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Filter doctors by time availability
     * @param doctors the list of doctors to filter
     * @param time the time period (AM/PM)
     * @return filtered list of doctors
     */
    private List<Doctor> filterDoctorsByTime(List<Doctor> doctors, String time) {
        if (time == null || time.trim().isEmpty()) {
            return doctors;
        }
        
        boolean isAM = time.trim().equalsIgnoreCase("AM");
        
        return doctors.stream()
            .filter(doctor -> {
                List<AvailableTime> availableTimes = doctor.getAvailableTimes();
                if (availableTimes == null || availableTimes.isEmpty()) {
                    return false;
                }
                
                return availableTimes.stream()
                    .anyMatch(availableTime -> {
                        LocalTime startTime = availableTime.getStartTime();
                        LocalTime endTime = availableTime.getEndTime();
                        
                        if (isAM) {
                            // Check if any time slot is in AM (before 12:00)
                            return startTime.isBefore(LocalTime.NOON) || endTime.isBefore(LocalTime.NOON);
                        } else {
                            // Check if any time slot is in PM (after 12:00)
                            return startTime.isAfter(LocalTime.NOON) || endTime.isAfter(LocalTime.NOON);
                        }
                    });
            })
            .collect(Collectors.toList());
    }

    /**
     * Filter doctors by name and time
     * @param name the name pattern
     * @param time the time period (AM/PM)
     * @return ResponseEntity with filtered doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> filterDoctorByNameAndTime(String name, String time) {
        try {
            List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCase(name);
            List<Doctor> filteredDoctors = filterDoctorsByTime(doctors, time);
            
            return serviceUtils.createSuccessResponse("Doctors filtered by name and time successfully", filteredDoctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error filtering doctors by name and time: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Filter doctors by name and specialty
     * @param name the name pattern
     * @param specialty the specialty
     * @return ResponseEntity with filtered doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> filterDoctorByNameAndSpecialty(String name, String specialty) {
        try {
            List<Doctor> doctors = doctorRepository.findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(name, specialty);
            return serviceUtils.createSuccessResponse("Doctors filtered by name and specialty successfully", doctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error filtering doctors by name and specialty: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Filter doctors by time and specialty
     * @param specialty the specialty
     * @param time the time period (AM/PM)
     * @return ResponseEntity with filtered doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> filterDoctorByTimeAndSpecialty(String specialty, String time) {
        try {
            List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specialty);
            List<Doctor> filteredDoctors = filterDoctorsByTime(doctors, time);
            
            return serviceUtils.createSuccessResponse("Doctors filtered by specialty and time successfully", filteredDoctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error filtering doctors by specialty and time: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Filter doctors by specialty
     * @param specialty the specialty
     * @return ResponseEntity with filtered doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> filterDoctorBySpecialty(String specialty) {
        try {
            List<Doctor> doctors = doctorRepository.findBySpecialtyIgnoreCase(specialty);
            return serviceUtils.createSuccessResponse("Doctors filtered by specialty successfully", doctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error filtering doctors by specialty: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Filter all doctors by time availability
     * @param time the time period (AM/PM)
     * @return ResponseEntity with filtered doctors
     */
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, Object>> filterDoctorsByTime(String time) {
        try {
            List<Doctor> allDoctors = doctorRepository.findAllWithAvailableTimes();
            List<Doctor> filteredDoctors = filterDoctorsByTime(allDoctors, time);
            
            return serviceUtils.createSuccessResponse("Doctors filtered by time successfully", filteredDoctors);
            
        } catch (Exception e) {
            return serviceUtils.createErrorResponse("Error filtering doctors by time: " + e.getMessage(), 
                                                  HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
