
package com.project.back_end.controllers;

import com.project.back_end.models.Appointment;
import com.project.back_end.services.AppointmentService;
import com.project.back_end.services.ValidationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final ValidationService validationService;

    public AppointmentController(AppointmentService appointmentService, ValidationService validationService) {
        this.appointmentService = appointmentService;
        this.validationService = validationService;
    }

    // GET: Fetch appointments by date and patient name
    @GetMapping("/get/{date}/{patientName}/{token}")
    public ResponseEntity<?> getAppointments(@PathVariable String date, @PathVariable String patientName, @PathVariable String token) {
        if (!validationService.validateToken(token, "doctor")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        List<Appointment> appointments = appointmentService.getAppointmentsByDateAndPatient(date, patientName);
        return ResponseEntity.ok(appointments);
    }

    // POST: Book a new appointment
    @PostMapping("/book/{token}")
    public ResponseEntity<?> bookAppointment(@Valid @RequestBody Appointment appointment, @PathVariable String token) {
        if (!validationService.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        int result = appointmentService.bookAppointment(appointment);
        if (result == 1) {
            return ResponseEntity.ok("Appointment booked successfully.");
        } else if (result == -1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid doctor ID.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Doctor is not available at the selected time.");
        }
    }

    // PUT: Update an existing appointment
    @PutMapping("/update/{token}")
    public ResponseEntity<?> updateAppointment(@Valid @RequestBody Appointment appointment, @PathVariable String token) {
        if (!validationService.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        return appointmentService.updateAppointment(appointment);
    }

    // DELETE: Cancel an appointment
    @DeleteMapping("/cancel/{appointmentId}/{token}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long appointmentId, @PathVariable String token) {
        if (!validationService.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
        }
        return appointmentService.cancelAppointment(appointmentId);
    }



// 1. Set Up the Controller Class:
//    - Annotate the class with `@RestController` to define it as a REST API controller.
//    - Use `@RequestMapping("/appointments")` to set a base path for all appointment-related endpoints.
//    - This centralizes all routes that deal with booking, updating, retrieving, and canceling appointments.


// 2. Autowire Dependencies:
//    - Inject `AppointmentService` for handling the business logic specific to appointments.
//    - Inject the general `Service` class, which provides shared functionality like token validation and appointment checks.


// 3. Define the `getAppointments` Method:
//    - Handles HTTP GET requests to fetch appointments based on date and patient name.
//    - Takes the appointment date, patient name, and token as path variables.
//    - First validates the token for role `"doctor"` using the `Service`.
//    - If the token is valid, returns appointments for the given patient on the specified date.
//    - If the token is invalid or expired, responds with the appropriate message and status code.


// 4. Define the `bookAppointment` Method:
//    - Handles HTTP POST requests to create a new appointment.
//    - Accepts a validated `Appointment` object in the request body and a token as a path variable.
//    - Validates the token for the `"patient"` role.
//    - Uses service logic to validate the appointment data (e.g., check for doctor availability and time conflicts).
//    - Returns success if booked, or appropriate error messages if the doctor ID is invalid or the slot is already taken.


// 5. Define the `updateAppointment` Method:
//    - Handles HTTP PUT requests to modify an existing appointment.
//    - Accepts a validated `Appointment` object and a token as input.
//    - Validates the token for `"patient"` role.
//    - Delegates the update logic to the `AppointmentService`.
//    - Returns an appropriate success or failure response based on the update result.


// 6. Define the `cancelAppointment` Method:
//    - Handles HTTP DELETE requests to cancel a specific appointment.
//    - Accepts the appointment ID and a token as path variables.
//    - Validates the token for `"patient"` role to ensure the user is authorized to cancel the appointment.
//    - Calls `AppointmentService` to handle the cancellation process and returns the result.


}
