

package com.project.back_end.controllers;


import com.project.back_end.models.Admin;
import com.project.back_end.services.ValidationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("${api.path}admin")
public class AdminController {

    private final ValidationService validationService;

    public AdminController(ValidationService validationService) {
        this.validationService = validationService;
    }

    // POST: Admin login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> adminLogin(@RequestBody Admin admin) {
        return validationService.validateAdmin(admin);
    }

    // GET: Get all admins (stub)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAdmins() {
        // Stub response for demonstration
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("status", "success");
        response.put("admins", java.util.Collections.emptyList());
        return ResponseEntity.ok(response);
    }

    // GET: Get admin by ID (stub)
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getAdminById(@PathVariable Long id) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("status", "success");
        response.put("admin", null); // Replace with actual admin lookup
        return ResponseEntity.ok(response);
    }

    // POST: Create new admin (stub)
    @PostMapping
    public ResponseEntity<Map<String, Object>> createAdmin(@RequestBody Admin admin) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("status", "success");
        response.put("message", "Admin created");
        return ResponseEntity.ok(response);
    }

    // PUT: Update admin (stub)
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateAdmin(@PathVariable Long id, @RequestBody Admin admin) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("status", "success");
        response.put("message", "Admin updated");
        return ResponseEntity.ok(response);
    }

    // DELETE: Delete admin (stub)
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteAdmin(@PathVariable Long id) {
        Map<String, Object> response = new java.util.HashMap<>();
        response.put("status", "success");
        response.put("message", "Admin deleted");
        return ResponseEntity.ok(response);
    }

}

