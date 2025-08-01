package com.project.back_end.repo;

import com.project.back_end.models.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    /**
     * Find appointments for a specific doctor within a time range
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE a.doctor.id = :doctorId AND a.appointmentTime BETWEEN :start AND :end " +
           "ORDER BY a.appointmentTime ASC")
    List<Appointment> findByDoctorIdAndAppointmentTimeBetween(@Param("doctorId") Long doctorId, 
                                                             @Param("start") LocalDateTime start, 
                                                             @Param("end") LocalDateTime end);

    /**
     * Find appointments for a specific doctor and patient name within a time range
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE a.doctor.id = :doctorId AND LOWER(a.patient.name) LIKE LOWER(CONCAT('%', :patientName, '%')) " +
           "AND a.appointmentTime BETWEEN :start AND :end " +
           "ORDER BY a.appointmentTime ASC")
    List<Appointment> findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(
            @Param("doctorId") Long doctorId, 
            @Param("patientName") String patientName, 
            @Param("start") LocalDateTime start, 
            @Param("end") LocalDateTime end);

    /**
     * Delete all appointments for a specific doctor
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM Appointment a WHERE a.doctor.id = :doctorId")
    void deleteAllByDoctorId(@Param("doctorId") Long doctorId);

    /**
     * Find all appointments for a specific patient ordered by appointment time
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE a.patient.id = :patientId ORDER BY a.appointmentTime DESC")
    List<Appointment> findByPatientIdOrderByAppointmentTimeDesc(@Param("patientId") Long patientId);

    /**
     * Find all appointments for a specific doctor ordered by appointment time
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE a.doctor.id = :doctorId ORDER BY a.appointmentTime DESC")
    List<Appointment> findByDoctorIdOrderByAppointmentTimeDesc(@Param("doctorId") Long doctorId);

    /**
     * Find appointments for a specific patient with a given status
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE a.patient.id = :patientId AND a.status = :status ORDER BY a.appointmentTime ASC")
    List<Appointment> findByPatient_IdAndStatusOrderByAppointmentTimeAsc(@Param("patientId") Long patientId, 
                                                                        @Param("status") int status);

    /**
     * Filter appointments by doctor name and patient ID
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE LOWER(a.doctor.name) LIKE LOWER(CONCAT('%', :doctorName, '%')) " +
           "AND a.patient.id = :patientId ORDER BY a.appointmentTime DESC")
    List<Appointment> filterByDoctorNameAndPatientId(@Param("doctorName") String doctorName, 
                                                     @Param("patientId") Long patientId);

    /**
     * Filter appointments by doctor name, patient ID, and status
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE LOWER(a.doctor.name) LIKE LOWER(CONCAT('%', :doctorName, '%')) " +
           "AND a.patient.id = :patientId AND a.status = :status ORDER BY a.appointmentTime DESC")
    List<Appointment> filterByDoctorNameAndPatientIdAndStatus(@Param("doctorName") String doctorName, 
                                                             @Param("patientId") Long patientId, 
                                                             @Param("status") int status);

    /**
     * Update appointment status by ID
     */
    @Modifying
    @Transactional
    @Query("UPDATE Appointment a SET a.status = :status WHERE a.id = :id")
    void updateStatus(@Param("status") int status, @Param("id") long id);

    /**
     * Find all appointments by patient ID
     */
    @Query("SELECT a FROM Appointment a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient " +
           "WHERE a.patient.id = :patientId")
    List<Appointment> findByPatientId(@Param("patientId") Long patientId);
}

   // 1. Extend JpaRepository:
//    - The repository extends JpaRepository<Appointment, Long>, which gives it basic CRUD functionality.
//    - The methods such as save, delete, update, and find are inherited without the need for explicit implementation.
//    - JpaRepository also includes pagination and sorting features.

// Example: public interface AppointmentRepository extends JpaRepository<Appointment, Long> {}

// 2. Custom Query Methods:

//    - **findByDoctorIdAndAppointmentTimeBetween**:
//      - This method retrieves a list of appointments for a specific doctor within a given time range.
//      - The doctor’s available times are eagerly fetched to avoid lazy loading.
//      - Return type: List<Appointment>
//      - Parameters: Long doctorId, LocalDateTime start, LocalDateTime end
//      - It uses a LEFT JOIN to fetch the doctor’s available times along with the appointments.

//    - **findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween**:
//      - This method retrieves appointments for a specific doctor and patient name (ignoring case) within a given time range.
//      - It performs a LEFT JOIN to fetch both the doctor and patient details along with the appointment times.
//      - Return type: List<Appointment>
//      - Parameters: Long doctorId, String patientName, LocalDateTime start, LocalDateTime end

//    - **deleteAllByDoctorId**:
//      - This method deletes all appointments associated with a particular doctor.
//      - It is marked as @Modifying and @Transactional, which makes it a modification query, ensuring that the operation is executed within a transaction.
//      - Return type: void
//      - Parameters: Long doctorId

//    - **findByPatientId**:
//      - This method retrieves all appointments for a specific patient.
//      - Return type: List<Appointment>
//      - Parameters: Long patientId

//    - **findByPatient_IdAndStatusOrderByAppointmentTimeAsc**:
//      - This method retrieves all appointments for a specific patient with a given status, ordered by the appointment time.
//      - Return type: List<Appointment>
//      - Parameters: Long patientId, int status

//    - **filterByDoctorNameAndPatientId**:
//      - This method retrieves appointments based on a doctor’s name (using a LIKE query) and the patient’s ID.
//      - Return type: List<Appointment>
//      - Parameters: String doctorName, Long patientId

//    - **filterByDoctorNameAndPatientIdAndStatus**:
//      - This method retrieves appointments based on a doctor’s name (using a LIKE query), patient’s ID, and a specific appointment status.
//      - Return type: List<Appointment>
//      - Parameters: String doctorName, Long patientId, int status

//    - **updateStatus**:
//      - This method updates the status of a specific appointment based on its ID.
//      - Return type: void
//      - Parameters: int status, long id

// 3. @Modifying and @Transactional annotations:
//    - The @Modifying annotation is used to indicate that the method performs a modification operation (like DELETE or UPDATE).

    /**
     * Check if any appointments exist for a specific doctor
     * @param doctorId the doctor ID to check
     * @return true if appointments exist, false otherwise
     */
    boolean existsByDoctorId(Long doctorId);

}