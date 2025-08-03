-- For MySQL: Find the doctor(s) with the most unique patients per month

SELECT
    t.year_month,
    t.doctor_id,
    d.name AS doctor_name,
    d.specialty,
    t.patient_count

    FROM appointment a
    GROUP BY year_month, a.doctor_id

ORDER BY t.year_month, t.doctor_id;