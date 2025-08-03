package com.project.back_end.DTO;

public class Login {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public Login() {
        // Default constructor for frameworks and deserialization
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}