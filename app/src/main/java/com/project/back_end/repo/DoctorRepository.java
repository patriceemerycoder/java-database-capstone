package com.project.back_end.repo;

import com.project.back_end.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    
    /**
     * Find a doctor by email address
     * @param email the email to search for
     * @return Optional containing the doctor if found
     */
    Optional<Doctor> findByEmail(String email);
    
    /**
     * Find doctors by name pattern (case-sensitive)
     * @param name the name pattern to search for
     * @return list of doctors matching the name pattern
     */
    @Query("SELECT d FROM Doctor d WHERE d.name LIKE CONCAT('%', :name, '%')")
    List<Doctor> findByNameLike(@Param("name") String name);
    
    /**
     * Find doctors by name containing (case-insensitive) and specialty (case-insensitive)
     * @param name the name pattern to search for
     * @param specialty the specialty to match
     * @return list of doctors matching both criteria
     */
    List<Doctor> findByNameContainingIgnoreCaseAndSpecialtyIgnoreCase(String name, String specialty);
    
    /**
     * Find doctors by specialty (case-insensitive)
     * @param specialty the specialty to search for
     * @return list of doctors with the specified specialty
     */
    List<Doctor> findBySpecialtyIgnoreCase(String specialty);
    
    /**
     * Find doctors by name containing (case-insensitive)
     * @param name the name pattern to search for
     * @return list of doctors matching the name pattern
     */
    List<Doctor> findByNameContainingIgnoreCase(String name);
    
    /**
     * Find all doctors with their available times eagerly loaded
     * @return list of all doctors with available times
     */
    @Query("SELECT DISTINCT d FROM Doctor d LEFT JOIN FETCH d.availableTimes")
    List<Doctor> findAllWithAvailableTimes();
    
    /**
     * Find doctor by ID with available times eagerly loaded
     * @param id the doctor ID
     * @return Optional containing the doctor with available times if found
     */
    @Query("SELECT d FROM Doctor d LEFT JOIN FETCH d.availableTimes WHERE d.id = :id")
    Optional<Doctor> findByIdWithAvailableTimes(@Param("id") Long id);
}