### Role: Patient

#### User Story 1
**As a patient,** I want to **book an appointment online** so that I can visit the doctor at my preferred time.

**Acceptance Criteria**
- Appointment booking form is available with date, time, and doctor selection.
- System prevents double-booking.
- Confirmation email or notification is sent.

#### User Story 2
**As a patient,** I want to **view my medical history** so I can understand my treatment timeline.

**Acceptance Criteria**
- Medical records are displayed in chronological order.
- Access is restricted to authenticated users.
- Only the patient can view their own records.

#### User Story 3
**As a patient,** I want to **message my doctor securely** so I can ask follow-up questions.

**Acceptance Criteria**
- Messaging is encrypted and stored securely.
- Messages are visible only to patient and assigned doctor.
- Notification is sent when a new message is received.

#### User Story 4
**As a patient,** I want to **receive reminders** for upcoming appointments so I don’t forget.

**Acceptance Criteria**
- Automated reminders via email or SMS.
- Reminder schedule is configurable (e.g. 24h before).
- Patients can opt in/out of reminders.

#### User Story 5
**As a patient,** I want to **update my personal details** so the clinic has my latest info.

**Acceptance Criteria**
- Form includes fields for address, contact number, emergency contact.
- Changes trigger audit logging.
- Only authenticated patients can update their own profile.

### Role: Doctor

#### User Story 1
**As a doctor,** I want to **view my daily schedule** so I can manage my consultations effectively.

**Acceptance Criteria**
- Dashboard shows appointments in a timeline format.
- Only the assigned doctor can view their schedule.
- Can toggle between daily/weekly views.

#### User Story 2
**As a doctor,** I want to **add medical notes after a consultation** so I can track patient progress.

**Acceptance Criteria**
- Notes are timestamped and editable only by the author.
- Notes are attached to patient records.
- Access control enforced by role and patient assignment.

#### User Story 3
**As a doctor,** I want to **prescribe medication digitally** so the pharmacy and patient are informed.

**Acceptance Criteria**
- Prescription form captures drug, dosage, and duration.
- Prescription logs are added to patient history.
- Digital signature or verification required.

#### User Story 4
**As a doctor,** I want to **refer patients to specialists** so they receive proper care.

**Acceptance Criteria**
- Referral form includes specialist name, reason, urgency.
- Notification sent to patient and specialist.
- Referrals appear in both patient and specialist dashboards.

#### User Story 5
**As a doctor,** I want to **mark appointments as completed or missed** so records stay accurate.

**Acceptance Criteria**
- Status selector available in appointment view.
- Timestamp logged when status is updated.
- Missed appointments trigger optional follow-up.

### Role: Admin

#### User Story 1
**As an admin,** I want to **manage user roles and permissions** so I can enforce access control.

**Acceptance Criteria**
- Role assignment UI is accessible.
- Permissions update instantly across system.
- Audit trail tracks changes.

#### User Story 2
**As an admin,** I want to **monitor system activity logs** so I can detect suspicious behavior.

**Acceptance Criteria**
- Logs include login attempts, data changes, role updates.
- Search and filter options are available.
- Can export logs securely.

#### User Story 3
**As an admin,** I want to **generate reports for clinic performance** so management can make informed decisions.

**Acceptance Criteria**
- Reports include appointment stats, doctor utilization, patient feedback.
- Export to CSV or view in dashboard.
- Configurable time periods and filters.

#### User Story 4
**As an admin,** I want to **approve new doctor registrations** so only verified professionals join the system.

**Acceptance Criteria**
- Registration requests stored in review queue.
- Admin can view credentials and approve/reject.
- Approved users receive onboarding email.

#### User Story 5
**As an admin,** I want to **update clinic working hours and calendar** so scheduling reflects availability.

**Acceptance Criteria**
- Admin panel includes calendar editor.
- Changes affect appointment booking module.
- Supports holidays and emergency closures.
