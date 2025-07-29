Field-Level Validation

Field

Validation

patientName

@NotNull, @Size(min = 3, max = 100)

appointmentId

@NotNull

medication

@NotNull, @Size(min = 3, max = 100)

dosage

@NotNull

doctorNotes

@Size(max = 200)

All fields are strictly validated for required input and reasonable length constraints — making the model safe, clean, and ready for production.