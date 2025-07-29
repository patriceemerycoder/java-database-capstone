import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity  // Marks the class as a JPA entity
public class Patient {

    // 1. Unique identifier for each patient
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. Patient's full name
    @NotNull
    @Size(min = 3, max = 100)
    private String name;

    // 3. Patient's email address with format validation
    @NotNull
    @Email
    private String email;

    // 4. Patient's password for login authentication
    @NotNull
    @Size(min = 6)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // 5. Patient's phone number, must be exactly 10 digits
    @NotNull
    @Pattern(regexp = "^[0-9]{10}$")
    private String phone;

    // 6. Patient's address, max length validation
    @NotNull
    @Size(max = 255)
    private String address;

    // No-argument constructor for JPA
    public Patient() {}

    // Optional parameterized constructor
    public Patient(String name, String email, String password, String phone, String address) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }

    // 7. Getters and setters
    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}