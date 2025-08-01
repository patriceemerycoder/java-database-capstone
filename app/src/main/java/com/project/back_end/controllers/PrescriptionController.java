
package com.project.back_end.controllers;

import com.project.back_end.models.Prescription;
import com.project.back_end.services.PrescriptionService;
import com.project.back_end.services.ValidationService;
import com.project.back_end.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;

@RestController
@RequestMapping("${api.path}prescription")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;
    private final ValidationService validationService;
    private final AppointmentService appointmentService;

    public PrescriptionController(PrescriptionService prescriptionService, ValidationService validationService, AppointmentService appointmentService) {
        this.prescriptionService = prescriptionService;
        this.validationService = validationService;
        this.appointmentService = appointmentService;
    }
    // POST: Save a new prescription for an appointment
    @PostMapping("/save/{token}")
    public ResponseEntity<?> savePrescription(@Valid @RequestBody Prescription prescription, @PathVariable String token) {
        // Validate doctor token
        if (!validationService.validateToken(token, "doctor")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        // Update appointment status to reflect prescription added
        appointmentService.changeStatus(prescription.getAppointmentId(), 1); // 1 = Completed/Prescription Added
        // Delegate to PrescriptionService
        return prescriptionService.savePrescription(prescription);
    }

    // GET: Retrieve prescription by appointment ID
    @GetMapping("/get/{appointmentId}/{token}")
    public ResponseEntity<?> getPrescription(@PathVariable Long appointmentId, @PathVariable String token) {
        // Validate doctor token
        if (!validationService.validateToken(token, "doctor")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        // Delegate to PrescriptionService
        return prescriptionService.getPrescription(appointmentId);
    }
}
