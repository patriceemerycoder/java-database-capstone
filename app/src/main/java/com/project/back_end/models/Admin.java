import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity  // Marks this class as a JPA entity
public class Admin {

    // 1. Unique identifier for the Admin entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 2. Admin username for login
    @NotNull
    private String username;

    // 3. Admin password for authentication; write-only in JSON
    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    // 4. No-argument constructor required by JPA
    public Admin() {}

    // Optional parameterized constructor
    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // 5. Getters and Setters
    public Long getId() { return id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}