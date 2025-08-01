// adminDashboard.js - Managing Doctors

// Import Required Modules
import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

// Event Binding
document.addEventListener('DOMContentLoaded', function() {
    // Attach click listener to "Add Doctor" button
    document.getElementById('addDocBtn').addEventListener('click', () => {
        openModal('addDoctor');
    });

    // Load Doctor Cards on Page Load
    loadDoctorCards();

    // Setup Search and Filter Logic
    setupSearchAndFilters();
});

/**
 * Load Doctor Cards on Page Load
 * Fetch all doctors and display them in the dashboard
 */
async function loadDoctorCards() {
    try {
        // Call getDoctors() to fetch doctor list from backend
        const doctors = await getDoctors();
        
        // Clear existing content
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = "";

        // Iterate through results and inject them using createDoctorCard()
        if (doctors && doctors.length > 0) {
            doctors.forEach(doctor => {
                const doctorCard = createDoctorCard(doctor);
                contentDiv.appendChild(doctorCard);
            });
        } else {
            contentDiv.innerHTML = "<p>No doctors found.</p>";
        }
    } catch (error) {
        console.error('Error loading doctor cards:', error);
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = "<p>Error loading doctors. Please try again.</p>";
    }
}

/**
 * Setup Search and Filter Logic
 * Attach event listeners to search bar and filter dropdowns
 */
function setupSearchAndFilters() {
    // Attach 'input' and 'change' event listeners
    document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
    document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
    document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
}

/**
 * Filter doctors based on search criteria
 * Called when search bar or filters change
 */
async function filterDoctorsOnChange() {
    try {
        // Read values from the search bar and filters
        const name = document.getElementById("searchBar").value.trim() || null;
        const time = document.getElementById("filterTime").value || null;
        const specialty = document.getElementById("filterSpecialty").value || null;

        // Call filterDoctors() from service
        const doctors = await filterDoctors(name, time, specialty);

        // Render filtered results
        renderDoctorCards(doctors);
    } catch (error) {
        console.error('Error filtering doctors:', error);
        alert('Failed to filter doctors. Please try again.');
    }
}

/**
 * Render Doctor Cards
 * Utility function to render doctor cards when passed a list
 */
function renderDoctorCards(doctors) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    if (doctors && doctors.length > 0) {
        // Iterate through the list and display the cards
        doctors.forEach(doctor => {
            const doctorCard = createDoctorCard(doctor);
            contentDiv.appendChild(doctorCard);
        });
    } else {
        // Show message if no doctors found
        contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    }
}

/**
 * Handle Add Doctor Modal
 * Global function to handle doctor addition (called from modal)
 */
window.adminAddDoctor = async function() {
    try {
        // Collect form data
        const name = document.getElementById('doctorName').value.trim();
        const specialization = document.getElementById('specialization').value;
        const email = document.getElementById('doctorEmail').value.trim();
        const password = document.getElementById('doctorPassword').value;
        const phone = document.getElementById('doctorPhone').value.trim();

        // Collect availability checkboxes
        const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
        const availability = Array.from(availabilityCheckboxes).map(cb => cb.value);

        // Validate required fields
        if (!name || !specialization || !email || !password || !phone) {
            alert('Please fill in all required fields.');
            return;
        }

        if (availability.length === 0) {
            alert('Please select at least one availability time.');
            return;
        }

        // Verify that a valid login token exists
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (!token) {
            alert('Authentication required. Please log in again.');
            return;
        }

        // Create doctor object
        const doctorData = {
            name: name,
            specialty: specialization,
            email: email,
            password: password,
            phone: phone,
            availability: availability
        };

        // Send POST request using saveDoctor() from services
        const result = await saveDoctor(doctorData, token);

        if (result.success) {
            // Success: close modal, show message, and refresh doctor list
            document.getElementById('modal').style.display = 'none';
            alert(result.message || 'Doctor added successfully!');
            
            // Refresh the doctor list
            await loadDoctorCards();
        } else {
            // Failed: alert user with error message
            alert(result.message || 'Failed to add doctor. Please try again.');
        }
    } catch (error) {
        console.error('Error adding doctor:', error);
        alert('An error occurred while adding the doctor. Please try again.');
    }
};

/**
 * Global function to handle doctor deletion
 */
window.deleteDoctor = async function(doctorId) {
    if (!confirm('Are you sure you want to delete this doctor?')) {
        return;
    }

    try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (!token) {
            alert('Authentication required. Please log in again.');
            return;
        }

        // Import deleteDoctor function dynamically if needed
        const { deleteDoctor } = await import('./services/doctorServices.js');
        const result = await deleteDoctor(doctorId, token);

        if (result.success) {
            alert(result.message || 'Doctor deleted successfully!');
            await loadDoctorCards(); // Refresh the list
        } else {
            alert(result.message || 'Failed to delete doctor.');
        }
    } catch (error) {
        console.error('Error deleting doctor:', error);
        alert('An error occurred while deleting the doctor.');
    }
};
