package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@Entity // Marks this class as a JPA entity
public class Doctor {

    // 1. Unique identifier for the doctor
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. Doctor's name with length constraints
    @NotNull
    @Size(min = 3, max = 100)
    private String name;

    // 3. Medical specialty
    @NotNull
    @Size(min = 3, max = 50)
    private String specialty;

    // 4. Validated email address
    @NotNull
    @Email
    private String email;

    // 5. Password for authentication, write-only in JSON
    @NotNull
    @Size(min = 6)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // 6. Phone number validation: exactly 10 digits
    @NotNull
    @Pattern(regexp = "^[0-9]{10}$")
    private String phone;

    // 7. Available time slots
    @ElementCollection
    private List<String> availableTimes;

    // No-argument constructor for JPA
    public Doctor() {}

    // Optional parameterized constructor
    public Doctor(String name, String specialty, String email, String password, String phone, List<String> availableTimes) {
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.availableTimes = availableTimes;
    }

    // 8. Standard getters and setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public List<String> getAvailableTimes() { return availableTimes; }
    public void setAvailableTimes(List<String> availableTimes) { this.availableTimes = availableTimes; }
}