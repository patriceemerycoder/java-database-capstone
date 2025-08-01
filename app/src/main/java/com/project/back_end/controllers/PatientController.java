package com.project.back_end.controllers;

import com.project.back_end.models.Patient;
import com.project.back_end.models.Login;
import com.project.back_end.services.PatientService;
import com.project.back_end.services.ValidationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;
    private final ValidationService validationService;

    public PatientController(PatientService patientService, ValidationService validationService) {
        this.patientService = patientService;
        this.validationService = validationService;
    }

    // GET: Retrieve patient details using token
    @GetMapping("/get/{token}")
    public ResponseEntity<?> getPatient(@PathVariable String token) {
        if (!validationService.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        return patientService.getPatientByToken(token);
    }

    // POST: Register a new patient
    @PostMapping("/register")
    public ResponseEntity<?> createPatient(@Valid @RequestBody Patient patient) {
        if (!validationService.validatePatient(patient)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Patient already exists.");
        }
        return patientService.createPatient(patient);
    }

    // POST: Patient login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login loginDto) {
        return validationService.validatePatientLogin(loginDto);
    }

    // GET: Get patient appointment details
    @GetMapping("/appointments/{patientId}/{token}/{role}")
    public ResponseEntity<?> getPatientAppointment(@PathVariable Long patientId, @PathVariable String token, @PathVariable String role) {
        if (!validationService.validateToken(token, role)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        return patientService.getPatientAppointments(patientId);
    }

    // GET: Filter patient appointments
    @GetMapping("/appointments/filter/{condition}/{name}/{token}")
    public ResponseEntity<?> filterPatientAppointment(@PathVariable String condition, @PathVariable String name, @PathVariable String token) {
        if (!validationService.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        return validationService.filterPatient(condition, name, token);
    }

}
package com.project.back_end.controllers;

public class PatientController {

// 1. Set Up the Controller Class:
//    - Annotate the class with `@RestController` to define it as a REST API controller for patient-related operations.
//    - Use `@RequestMapping("/patient")` to prefix all endpoints with `/patient`, grouping all patient functionalities under a common route.


// 2. Autowire Dependencies:
//    - Inject `PatientService` to handle patient-specific logic such as creation, retrieval, and appointments.
//    - Inject the shared `Service` class for tasks like token validation and login authentication.


// 3. Define the `getPatient` Method:
//    - Handles HTTP GET requests to retrieve patient details using a token.
//    - Validates the token for the `"patient"` role using the shared service.
//    - If the token is valid, returns patient information; otherwise, returns an appropriate error message.


// 4. Define the `createPatient` Method:
//    - Handles HTTP POST requests for patient registration.
//    - Accepts a validated `Patient` object in the request body.
//    - First checks if the patient already exists using the shared service.
//    - If validation passes, attempts to create the patient and returns success or error messages based on the outcome.


// 5. Define the `login` Method:
//    - Handles HTTP POST requests for patient login.
//    - Accepts a `Login` DTO containing email/username and password.
//    - Delegates authentication to the `validatePatientLogin` method in the shared service.
//    - Returns a response with a token or an error message depending on login success.


// 6. Define the `getPatientAppointment` Method:
//    - Handles HTTP GET requests to fetch appointment details for a specific patient.
//    - Requires the patient ID, token, and user role as path variables.
//    - Validates the token using the shared service.
//    - If valid, retrieves the patient's appointment data from `PatientService`; otherwise, returns a validation error.


// 7. Define the `filterPatientAppointment` Method:
//    - Handles HTTP GET requests to filter a patient's appointments based on specific conditions.
//    - Accepts filtering parameters: `condition`, `name`, and a token.
//    - Token must be valid for a `"patient"` role.
//    - If valid, delegates filtering logic to the shared service and returns the filtered result.



}


