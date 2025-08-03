package com.project.back_end.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/doctor")
public class WorkingDoctorController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllDoctors() {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> doctors = Arrays.asList(
            Map.of("id", 1, "name", "Dr. Smith", "specialty", "Cardiology", "email", "smith@hospital.com", "phone", "555-0101"),
            Map.of("id", 2, "name", "Dr. Johnson", "specialty", "Pediatrics", "email", "johnson@hospital.com", "phone", "555-0102"),
            Map.of("id", 3, "name", "Dr. Brown", "specialty", "Dermatology", "email", "brown@hospital.com", "phone", "555-0103"),
            Map.of("id", 4, "name", "Dr. Wilson", "specialty", "Orthopedics", "email", "wilson@hospital.com", "phone", "555-0104")
        );
        
        response.put("success", true);
        response.put("message", "Doctors retrieved successfully");
        response.put("data", doctors);
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/filter/{name}/{time}/{specialty}")
    public ResponseEntity<Map<String, Object>> filterDoctors(
            @PathVariable String name,
            @PathVariable String time,
            @PathVariable String specialty) {
        
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> filteredDoctors = new ArrayList<>();
        
        // Sample filtered results based on parameters
        if ("Cardiology".equalsIgnoreCase(specialty)) {
            filteredDoctors.add(Map.of("id", 1, "name", "Dr. Smith", "specialty", "Cardiology", "email", "smith@hospital.com", "availableTime", time));
        }
        if ("Pediatrics".equalsIgnoreCase(specialty)) {
            filteredDoctors.add(Map.of("id", 2, "name", "Dr. Johnson", "specialty", "Pediatrics", "email", "johnson@hospital.com", "availableTime", time));
        }
        
        response.put("success", true);
        response.put("message", "Filtered doctors retrieved successfully");
        response.put("data", filteredDoctors);
        response.put("filters", Map.of("name", name, "time", time, "specialty", specialty));
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<Map<String, Object>> getDoctorsBySpecialty(@PathVariable String specialty) {
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> doctors = new ArrayList<>();
        
        // Sample doctors by specialty
        switch (specialty.toLowerCase()) {
            case "cardiology":
                doctors.add(Map.of("id", 1, "name", "Dr. Smith", "specialty", "Cardiology", "email", "smith@hospital.com"));
                break;
            case "pediatrics":
                doctors.add(Map.of("id", 2, "name", "Dr. Johnson", "specialty", "Pediatrics", "email", "johnson@hospital.com"));
                break;
            case "dermatology":
                doctors.add(Map.of("id", 3, "name", "Dr. Brown", "specialty", "Dermatology", "email", "brown@hospital.com"));
                break;
            default:
                doctors = Arrays.asList(); // Empty list for unknown specialties
        }
        
        response.put("success", true);
        response.put("message", "Doctors by specialty retrieved successfully");
        response.put("data", doctors);
        response.put("specialty", specialty);
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/availability/{doctorId}")
    public ResponseEntity<Map<String, Object>> getDoctorAvailability(@PathVariable Long doctorId) {
        Map<String, Object> response = new HashMap<>();
        List<String> availableSlots = Arrays.asList(
            "09:00 AM", "10:00 AM", "11:00 AM", 
            "02:00 PM", "03:00 PM", "04:00 PM"
        );
        
        response.put("success", true);
        response.put("message", "Doctor availability retrieved successfully");
        response.put("doctorId", doctorId);
        response.put("availableSlots", availableSlots);
        response.put("date", java.time.LocalDate.now().toString());
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        
        return ResponseEntity.ok(response);
    }
}
