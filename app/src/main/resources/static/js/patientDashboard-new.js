// patientDashboard.js – Viewing & Filtering Doctors

// Import Required Modules
import { createDoctorCard } from './components/doctorCard.js';
import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors } from './services/doctorServices.js';
import { patientLogin, patientSignup } from './services/patientServices.js';

// Load Doctor Cards on Page Load
document.addEventListener("DOMContentLoaded", () => {
    loadDoctorCards();
    bindModalTriggers();
    setupSearchAndFilter();
});

/**
 * Load Doctor Cards on Page Load
 * Fetch and display all available doctors
 */
async function loadDoctorCards() {
    try {
        // Call getDoctors() to fetch the list of all available doctors
        const doctors = await getDoctors();
        
        // Clear any existing content inside the #content div
        const contentDiv = document.getElementById("content");
        if (contentDiv) {
            contentDiv.innerHTML = "";
            
            // Iterate over the results and render each doctor
            if (doctors && doctors.length > 0) {
                doctors.forEach(doctor => {
                    const doctorCard = createDoctorCard(doctor);
                    contentDiv.appendChild(doctorCard);
                });
            } else {
                contentDiv.innerHTML = "<p>No doctors available at the moment.</p>";
            }
        }
    } catch (error) {
        console.error('Error loading doctor cards:', error);
        const contentDiv = document.getElementById("content");
        if (contentDiv) {
            contentDiv.innerHTML = "<p>Error loading doctors. Please try again later.</p>";
        }
    }
}

/**
 * Bind Modal Triggers for Login and Signup
 * Add event listeners for patient signup and login buttons
 */
function bindModalTriggers() {
    // Signup button event listener
    const signupBtn = document.getElementById("patientSignup");
    if (signupBtn) {
        signupBtn.addEventListener("click", () => openModal("patientSignup"));
    }
    
    // Login button event listener
    const loginBtn = document.getElementById("patientLogin");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => openModal("patientLogin"));
    }
}

/**
 * Search and Filter Logic
 * Set up listeners for search bar and filter dropdowns
 */
function setupSearchAndFilter() {
    // Search bar listener
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", filterDoctorsOnChange);
    }
    
    // Availability time filter listener
    const filterTime = document.getElementById("filterTime");
    if (filterTime) {
        filterTime.addEventListener("change", filterDoctorsOnChange);
    }
    
    // Specialty filter listener
    const filterSpecialty = document.getElementById("filterSpecialty");
    if (filterSpecialty) {
        filterSpecialty.addEventListener("change", filterDoctorsOnChange);
    }
}

/**
 * Filter Doctors On Change
 * Called when search or filter inputs change
 */
async function filterDoctorsOnChange() {
    try {
        // Gather values from all three filter/search inputs
        const name = document.getElementById("searchBar")?.value.trim() || null;
        const time = document.getElementById("filterTime")?.value || null;
        const specialty = document.getElementById("filterSpecialty")?.value || null;
        
        // Use filterDoctors() to fetch filtered results
        const doctors = await filterDoctors(name, time, specialty);
        
        // Clear existing content
        const contentDiv = document.getElementById("content");
        if (contentDiv) {
            contentDiv.innerHTML = "";
            
            if (doctors && doctors.length > 0) {
                // Render doctors using createDoctorCard()
                doctors.forEach(doctor => {
                    const doctorCard = createDoctorCard(doctor);
                    contentDiv.appendChild(doctorCard);
                });
            } else {
                // Display fallback message if no doctors found
                contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
            }
        }
    } catch (error) {
        console.error('Error filtering doctors:', error);
        const contentDiv = document.getElementById("content");
        if (contentDiv) {
            contentDiv.innerHTML = "<p>Error filtering doctors. Please try again.</p>";
        }
    }
}

/**
 * Render Doctor Cards Utility
 * Helper function to render a given list of doctors
 */
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    if (contentDiv) {
        contentDiv.innerHTML = "";
        
        if (doctors && doctors.length > 0) {
            doctors.forEach(doctor => {
                const doctorCard = createDoctorCard(doctor);
                contentDiv.appendChild(doctorCard);
            });
        } else {
            contentDiv.innerHTML = "<p>No doctors available.</p>";
        }
    }
}

/**
 * Handle Patient Signup
 * Global function triggered on signup form submission
 */
window.signupPatient = async function () {
    try {
        // Collect user inputs
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;
        const phone = document.getElementById('phone')?.value.trim();
        const address = document.getElementById('address')?.value.trim();
        
        // Validate required fields
        if (!name || !email || !password || !phone || !address) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create patient data object
        const patientData = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            address: address
        };
        
        // Send data to backend via patientSignup()
        const result = await patientSignup(patientData);
        
        if (result.success) {
            // On success: show alert, close modal, reload page
            alert(result.message || 'Registration successful! Please log in.');
            document.getElementById('modal').style.display = 'none';
            window.location.reload();
        } else {
            // On failure: show error message
            alert(result.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during patient signup:', error);
        alert('An error occurred during registration. Please try again.');
    }
};

/**
 * Handle Patient Login
 * Global function triggered on login form submission
 */
window.loginPatient = async function () {
    try {
        // Capture login credentials
        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;
        
        // Validate required fields
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
        
        // Create credentials object
        const credentials = {
            email: email,
            password: password
        };
        
        // Call patientLogin() to authenticate
        const result = await patientLogin(credentials);
        
        if (result.success) {
            // On success: store JWT token and redirect
            if (result.data.token) {
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('authToken', result.data.token);
                localStorage.setItem('userData', JSON.stringify(result.data.patient));
                localStorage.setItem('userRole', 'patient');
            }
            
            alert(result.message || 'Login successful!');
            
            // Redirect user to logged patient dashboard
            window.location.href = 'loggedPatientDashboard.html';
        } else {
            // On failure: show error alert
            alert(result.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error during patient login:', error);
        alert('An error occurred during login. Please try again.');
    }
};

/**
 * Global function to book appointment with specific doctor
 */
window.bookAppointmentWithDoctor = function(doctorId) {
    // Check if patient is logged in
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'patient') {
        alert('Please log in as a patient to book an appointment.');
        openModal('patientLogin');
        return;
    }
    
    // Store selected doctor and redirect to appointment booking
    localStorage.setItem('selectedDoctorId', doctorId);
    window.location.href = 'patientAppointments.html';
};

/**
 * Global function to view doctor details
 */
window.viewDoctorDetails = function(doctorId) {
    // Implementation for viewing doctor details
    // This could open a modal or navigate to a detailed view
    console.log('View details for doctor:', doctorId);
    // TODO: Implement doctor details modal or page
};
