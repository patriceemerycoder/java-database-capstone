# 📘 Expanded User Stories – Clinic Patient Admin Portal

---

## 👩‍💼 Admin User Stories

### Title:
_As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**
1. Login screen verifies credentials.  
2. Failed attempts limited and logged.  
3. Access granted based on role.

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Include 2FA support and secure session token handling.

---

### Title:
_As an admin, I want to log out of the portal, so that I can protect system access._

**Acceptance Criteria:**
1. Logout ends session immediately.  
2. User redirected to login screen.  
3. Session cookie invalidated.

**Priority:** High  
**Story Points:** 1  
**Notes:**  
- Auto logout after inactivity helps enhance security.

---

### Title:
_As an admin, I want to add doctors to the portal, so that they can manage appointments and patient records._

**Acceptance Criteria:**
1. Form supports specialty, availability, contact details.  
2. Role and credentials are validated.  
3. Doctor receives welcome notification.

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Use structured input validation and audit log.

---

### Title:
_As an admin, I want to delete a doctor's profile from the portal, so that only active professionals appear in the system._

**Acceptance Criteria:**
1. Confirmation required before deletion.  
2. Profile removed from booking and dashboard.  
3. Action recorded in system log.

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Recommend soft delete for historical data retention.

---

### Title:
_As an admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics._

**Acceptance Criteria:**
1. Procedure accepts date range input.  
2. Returns result grouped by month.  
3. Output can be exported or visualized.

**Priority:** Medium  
**Story Points:** 3  
**Notes:**  
- Useful for reporting and dashboard integration.

---

## 👩‍⚕️ Patient User Stories

### Title:
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. Searchable doctor list available publicly.  
2. Shows specialty, availability, profile summary.  
3. Book button prompts login.

**Priority:** Medium  
**Story Points:** 2  
**Notes:**  
- Consider caching or search index optimization.

---

### Title:
_As a patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. Signup validates email and password strength.  
2. Email verification required.  
3. Redirects to login after success.

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Include CAPTCHA and anti-bot verification.

---

### Title:
_As a patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. Secure authentication via encrypted credentials.  
2. Session persists during activity.  
3. Incorrect attempts limited.

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Include password reset and lockout alert.

---

### Title:
_As a patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**
1. Session ends immediately.  
2. User redirected to home or login screen.  
3. Cookies and tokens invalidated.

**Priority:** High  
**Story Points:** 1  
**Notes:**  
- Add auto logout after inactivity.

---

### Title:
_As a patient, I want to log in and book an hour-long appointment, so that I can consult with a doctor._

**Acceptance Criteria:**
1. Hour slots available for booking.  
2. Confirmation sent after scheduling.  
3. Slot reserved in doctor's calendar.

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Consider buffer times and cancellation logic.

---

### Title:
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**
1. Future appointments listed chronologically.  
2. Details include date, doctor, location.  
3. Cancel/reschedule options included.

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Support calendar export if feasible.

---

## 🧑‍⚕️ Doctor User Stories

### Title:
_As a doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. Login grants access to doctor dashboard.  
2. Valid credentials required.  
3. Session managed securely.

**Priority:** High  
**Story Points:** 2  
**Notes:**  
- Suggest use of MFA for enhanced security.

---

### Title:
_As a doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**
1. Logout ends session securely.  
2. Redirect to login screen.  
3. Clear session cache and cookies.

**Priority:** High  
**Story Points:** 1  
**Notes:**  
- Allow logout from any view with quick access.

---

### Title:
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. Calendar shows confirmed, pending, and canceled slots.  
2. Includes patient info and visit reason.  
3. Supports daily/weekly navigation.

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Add filters and export option.

---

### Title:
_As a doctor, I want to mark my unavailability, so that patients only see open slots._

**Acceptance Criteria:**
1. UI for blocking specific hours/days.  
2. Booking disabled for those periods.  
3. Conflict alerts triggered if appointments overlap.

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Admin override should require approval.

---

### Title:
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. Editable fields for contact, location, specialty.  
2. Updates applied instantly.  
3. Visibility settings available.

**Priority:** Medium  
**Story Points:** 2  
**Notes:**  
- Profile audit log recommended.

---

### Title:
_As a doctor, I want to view the patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**
1. Patient summary linked to appointment slot.  
2. Includes history and visit purpose.  
3. Data access restricted to assigned doctor.

**Priority:** High  
**Story Points:** 3  
**Notes:**  
- Consider data masking for sensitive fields.