app/src/main/resources
├── application.properties
├── static
│   ├── index.html
│   ├── assets
│   │   ├── css
│   │   │   ├── addPrescription.css
│   │   │   ├── adminDashboard.css
│   │   │   ├── doctorDashboard.css
│   │   │   ├── index.css
│   │   │   ├── patientDashboard.css
│   │   │   ├── style.css
│   │   │   └── updateAppointment.css
│   │   └── images
│   │       ├── addPrescriptionIcon
│   │       │   └── addPrescription.png
│   │       ├── edit
│   │       │   └── edit.png
│   │       ├── defineRole
│   │       │   └── index.png
│   │       └── logo
│   │           └── logo.png
│   ├── js
│   │   ├── components
│   │   │   ├── appointmentRow.js
│   │   │   ├── doctorCard.js
│   │   │   ├── footer.js
│   │   │   ├── header.js
│   │   │   ├── modals.js
│   │   │   ├── patientRecordRow.js
│   │   │   └── patientRows.js
│   │   ├── config
│   │   │   ├── config.js
│   │   ├── services
│   │   │   ├── appointmentRecordService.js
│   │   │   ├── doctorServices.js
│   │   │   ├── index.js
│   │   │   ├── patientServices.js
│   │   │   └── prescriptionServices.js
│   │   ├── addPrescription.js
│   │   ├── adminDashboard.js
│   │   ├── appointmentRecord.js
│   │   ├── doctorDashboard.js
│   │   ├── loggedPatient.js
│   │   ├── patientAppointment.js
│   │   ├── patientDashboard.js
│   │   ├── patientRecordServices.js
│   │   ├── render.js
│   │   ├── updateAppointment.js
│   │   └── util.js
│   └── pages
│       ├── addPrescription.html
│       ├── loggedPatientDashboard.html
│       ├── patientAppointments.html
│       ├── patientDashboard.html
│       ├── patientRecord.html
│       └── updateAppointment.html
└── templates
    ├── admin
    │   └── adminDashboard.html
    └── doctor
        └── doctorDashboard.html

Each folder has a specific purpose:

assets/css: CSS files for styling individual pages and shared components like buttons, headers, and modals.
assets/images: Icons, logos, and illustrations used throughout the UI. Organized into folders like logo, edit, and index for easier reuse.
pages: Standalone HTML files for different user roles and screens, such as patientDashboard.html or addPrescription.html. These are dynamically updated by JavaScript.
js: JavaScript logic, broken into:
services/: API communication logic for doctors, patients, prescriptions, and appointments. Handles all fetch and CRUD operations.
components/: Reusable UI components like header.js, doctorCard.js, and modals.js to keep layout and interaction code modular.
config/: Stores shared constants and settings such as API base URLs or environment variables in config.js.
Page-specific files: Role-based scripts like adminDashboard.js, updateAppointment.js, or patientDashboard.js for handling user interaction, rendering, and calling services.
util.js: Helper functions shared across pages, such as token handling, date formatting, or alerts.
templates: Thymeleaf-based HTML templates rendered by the backend for authenticated users. Split into folders like admin/ and doctor/ to serve role-specific views.
application.properties: Central configuration file for Spring Boot that sets up server ports, database access, and environment properties.

