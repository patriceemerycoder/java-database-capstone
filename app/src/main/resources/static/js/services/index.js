// index.js - Role-Based Login Handling Service

// Import Required Modules
import { openModal } from '../components/modals.js';
import { adminLogin } from './adminServices.js';
import { doctorLogin } from './doctorServices.js';

// Import selectRole function from render.js or define it locally
// Since render.js doesn't export it, we'll access it globally or define it
function selectRole(role) {
    // Set role in localStorage using setRole from util.js
    if (typeof setRole === 'function') {
        setRole(role);
    } else {
        localStorage.setItem('userRole', role);
    }
    
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    
    if (role === "admin") {
        if (token) {
            window.location.href = `/templates/admin/adminDashboard.html`;
        }
    } else if (role === "patient") {
        window.location.href = "/pages/patientDashboard.html";
    } else if (role === "doctor") {
        if (token) {
            window.location.href = `/templates/doctor/doctorDashboard.html`;
        }
    }
}

// Setup Button Event Listeners
window.onload = function () {
    // Select Admin login button and attach event listener
    const adminBtn = document.getElementById('adminLogin');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            openModal('adminLogin');
        });
    }

    // Select Doctor login button and attach event listener  
    const doctorBtn = document.getElementById('doctorLogin');
    if (doctorBtn) {
        doctorBtn.addEventListener('click', () => {
            openModal('doctorLogin');
        });
    }

    // If specific login buttons don't exist, look for role cards
    const adminCard = document.querySelector('.role-card.admin');
    if (adminCard && !adminBtn) {
        // Override the existing click handler for admin card
        adminCard.onclick = function() {
            openModal('adminLogin');
        };
    }

    const doctorCard = document.querySelector('.role-card.doctor');
    if (doctorCard && !doctorBtn) {
        // Override the existing click handler for doctor card
        doctorCard.onclick = function() {
            openModal('doctorLogin');
        };
    }
};

// Implement Admin Login Handler
window.adminLoginHandler = async function () {
    try {
        // Step 1: Get the entered username and password from input fields
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate input fields
        if (!username || !password) {
            alert('Please enter both username and password!');
            return;
        }

        // Step 2: Create admin credentials object
        const admin = { username, password };

        // Step 3: Use existing adminLogin service
        const result = await adminLogin(admin);

        // Step 4: Handle response
        if (result.success) {
            alert('Admin login successful!');
            
            // Close the modal
            document.getElementById('modal').style.display = 'none';
            
            // Call selectRole to proceed with admin-specific behavior
            selectRole('admin');
        } else {
            // Step 5: Handle login failure
            alert(result.message || 'Invalid credentials!');
        }

    } catch (error) {
        // Step 6: Handle network or server errors
        console.error('Admin login error:', error);
        alert('Network error occurred. Please try again later.');
    }
};

// Implement Doctor Login Handler
window.doctorLoginHandler = async function () {
    try {
        // Step 1: Get the entered email and password from input fields
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate input fields
        if (!email || !password) {
            alert('Please enter both email and password!');
            return;
        }

        // Step 2: Create doctor credentials object
        const doctor = { email, password };

        // Step 3: Use existing doctorLogin service
        const result = await doctorLogin(doctor);

        // Step 4: Handle response
        if (result.success) {
            alert('Doctor login successful!');
            
            // Close the modal
            document.getElementById('modal').style.display = 'none';
            
            // Call selectRole to proceed with doctor-specific behavior
            selectRole('doctor');
        } else {
            // Handle login failure
            alert(result.message || 'Invalid credentials!');
        }

    } catch (error) {
        // Handle network or server errors
        console.error('Doctor login error:', error);
        alert('Network error occurred. Please try again later.');
    }
};
