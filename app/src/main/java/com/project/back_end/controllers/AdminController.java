

package com.project.back_end.controllers;


import com.project_back_end.models.Admin;
import com.project_back_end.services.ValidationService;
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

// 1. Set Up the Controller Class:
//    - Annotate the class with `@RestController` to indicate that it's a REST controller, used to handle web requests and return JSON responses.
//    - Use `@RequestMapping("${api.path}admin")` to define a base path for all endpoints in this controller.
//    - This allows the use of an external property (`api.path`) for flexible configuration of endpoint paths.


// 2. Autowire Service Dependency:
//    - Use constructor injection to autowire the `Service` class.
//    - The service handles core logic related to admin validation and token checking.
//    - This promotes cleaner code and separation of concerns between the controller and business logic layer.


// 3. Define the `adminLogin` Method:
//    - Handles HTTP POST requests for admin login functionality.
//    - Accepts an `Admin` object in the request body, which contains login credentials.
//    - Delegates authentication logic to the `validateAdmin` method in the service layer.
//    - Returns a `ResponseEntity` with a `Map` containing login status or messages.



}

