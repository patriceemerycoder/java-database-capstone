// doctorDashboard.js – Managing Appointments

// Import Required Modules
import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

// Initialize Global Variables
let patientTableBody = null;
let selectedDate = new Date().toISOString().split('T')[0]; // Today's date
let token = localStorage.getItem('token') || localStorage.getItem('authToken');
let patientName = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize references
    patientTableBody = document.getElementById('patientTableBody');
    
    // Setup Search Bar Functionality
    setupSearchBar();
    
    // Bind Event Listeners to Filter Controls
    setupFilterControls();
    
    // Initial render on page load
    renderContent();
    loadAppointments();
});

/**
 * Setup Search Bar Functionality
 * Add event listener to search bar for patient name filtering
 */
function setupSearchBar() {
    const searchBar = document.getElementById('searchBar');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            // Update patientName variable
            patientName = this.value.trim() || null;
            
            // If search input is empty, default patientName to null
            if (!patientName || patientName === '') {
                patientName = null;
            }
            
            // Call loadAppointments() to refresh the list
            loadAppointments();
        });
    }
}

/**
 * Bind Event Listeners to Filter Controls
 * Setup event listeners for date picker and today button
 */
function setupFilterControls() {
    // "Today's Appointments" button
    const todayButton = document.getElementById('todayButton');
    if (todayButton) {
        todayButton.addEventListener('click', function() {
            // Reset selectedDate to today
            selectedDate = new Date().toISOString().split('T')[0];
            
            // Update the date picker field to reflect today's date
            const datePicker = document.getElementById('datePicker');
            if (datePicker) {
                datePicker.value = selectedDate;
            }
            
            // Call loadAppointments()
            loadAppointments();
        });
    }

    // Date picker
    const datePicker = document.getElementById('datePicker');
    if (datePicker) {
        // Set initial value to today
        datePicker.value = selectedDate;
        
        datePicker.addEventListener('change', function() {
            // Update selectedDate variable when changed
            selectedDate = this.value;
            
            // Call loadAppointments() to fetch appointments for selected date
            loadAppointments();
        });
    }
}

/**
 * Load Appointments Function
 * Fetch and display appointments based on selected date and search criteria
 */
async function loadAppointments() {
    try {
        if (!patientTableBody) {
            console.error('Patient table body not found');
            return;
        }

        // Use getAllAppointments() to fetch appointment data
        const appointments = await getAllAppointments(selectedDate, patientName, token);

        // Clear existing content in the table
        patientTableBody.innerHTML = '';

        if (!appointments || appointments.length === 0) {
            // Display "No appointments found" message
            const noAppointmentsRow = document.createElement('tr');
            noAppointmentsRow.innerHTML = `
                <td colspan="6" class="text-center text-muted">
                    No appointments found for ${selectedDate}
                </td>
            `;
            patientTableBody.appendChild(noAppointmentsRow);
        } else {
            // For each appointment, extract patient details and create row
            appointments.forEach(appointment => {
                try {
                    // Use createPatientRow() to create a <tr> for each appointment
                    const patientRow = createPatientRow(appointment);
                    if (patientRow) {
                        patientTableBody.appendChild(patientRow);
                    }
                } catch (rowError) {
                    console.error('Error creating patient row:', rowError);
                }
            });
        }
    } catch (error) {
        console.error('Error loading appointments:', error);
        
        // Display fallback error message row in the table
        if (patientTableBody) {
            patientTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-danger">
                        Error loading appointments. Please try again later.
                    </td>
                </tr>
            `;
        }
    }
}

/**
 * Render Content Function
 * Called on initial page load (if needed for additional setup)
 */
function renderContent() {
    // Check if user is authenticated and has correct role
    const userRole = localStorage.getItem('userRole');
    const authToken = localStorage.getItem('token') || localStorage.getItem('authToken');
    
    if (!authToken) {
        alert('Authentication required. Please log in.');
        window.location.href = '/';
        return;
    }
    
    if (userRole !== 'doctor') {
        alert('Access denied. Doctor credentials required.');
        window.location.href = '/';
        return;
    }
    
    // Update token reference
    token = authToken;
}

/**
 * Global function to refresh appointments
 */
window.refreshAppointments = function() {
    loadAppointments();
};

/**
 * Global function to handle appointment status updates
 */
window.updateAppointmentStatus = async function(appointmentId, newStatus) {
    try {
        // Import updateAppointmentStatus dynamically if needed
        const { updateAppointmentStatus } = await import('./services/doctorServices.js');
        
        const result = await updateAppointmentStatus(appointmentId, newStatus);
        
        if (result.success) {
            alert('Appointment status updated successfully!');
            loadAppointments(); // Refresh the list
        } else {
            alert(result.message || 'Failed to update appointment status.');
        }
    } catch (error) {
        console.error('Error updating appointment status:', error);
        alert('An error occurred while updating the appointment.');
    }
};

/**
 * Global function to view patient details
 */
window.viewPatientDetails = async function(patientId) {
    try {
        // Import getPatientDetails dynamically if needed
        const { getPatientDetails } = await import('./services/doctorServices.js');
        
        const result = await getPatientDetails(patientId);
        
        if (result.success) {
            // Display patient details in a modal or popup
            // This would typically open a modal with patient information
            console.log('Patient details:', result.data);
            // TODO: Implement modal display for patient details
        } else {
            alert(result.message || 'Failed to fetch patient details.');
        }
    } catch (error) {
        console.error('Error fetching patient details:', error);
        alert('An error occurred while fetching patient details.');
    }
};
