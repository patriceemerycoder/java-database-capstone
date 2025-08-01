
package com.project.back_end.services;

import com.project.back_end.models.Prescription;
import com.project.back_end.repo.PrescriptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class PrescriptionService {
    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    // Save a new prescription for an appointment
    public ResponseEntity<?> savePrescription(Prescription prescription) {
        try {
            List<Prescription> existing = prescriptionRepository.findByAppointmentId(prescription.getAppointmentId());
            if (existing != null && !existing.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Prescription already exists for this appointment.");
            }
            prescriptionRepository.save(prescription);
            return ResponseEntity.status(HttpStatus.CREATED).body("Prescription saved successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving prescription: " + e.getMessage());
        }
    }

    // Retrieve prescription by appointment ID
    public ResponseEntity<?> getPrescription(Long appointmentId) {
        try {
            List<Prescription> prescriptions = prescriptionRepository.findByAppointmentId(appointmentId);
            if (prescriptions == null || prescriptions.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No prescription found for this appointment.");
            }
            Map<String, Object> result = new HashMap<>();
            result.put("prescription", prescriptions.get(0));
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving prescription: " + e.getMessage());
        }
    }
}
