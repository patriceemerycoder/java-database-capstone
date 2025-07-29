// doctorServices.js - Doctor API Service Module

// Import API Base URL
import { API_BASE_URL } from "../config/config.js";

// Set Doctor API Endpoint
const DOCTOR_API = API_BASE_URL + '/doctor';

/**
 * Get All Doctors
 * Fetches the complete list of doctors from the backend
 * @returns {Array} Array of doctor objects or empty array on error
 */
export async function getDoctors() {
    try {
        const response = await fetch(`${DOCTOR_API}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.doctors || data || [];
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return [];
    }
}

/**
 * Delete a Doctor
 * Removes a doctor from the system (Admin only)
 * @param {number} id - Doctor's unique identifier
 * @param {string} token - Authentication token
 * @returns {Object} Response object with success status and message
 */
export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: data.message || 'Doctor deleted successfully'
            };
        } else {
            return {
                success: false,
                message: data.message || 'Failed to delete doctor'
            };
        }
    } catch (error) {
        console.error('Error deleting doctor:', error);
        return {
            success: false,
            message: 'Network error occurred while deleting doctor'
        };
    }
}

/**
 * Save (Add) a New Doctor
 * Creates a new doctor record in the system (Admin only)
 * @param {Object} doctor - Doctor details object
 * @param {string} token - Authentication token
 * @returns {Object} Response object with success status and message
 */
export async function saveDoctor(doctor, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: data.message || 'Doctor added successfully',
                data: data.doctor || data
            };
        } else {
            return {
                success: false,
                message: data.message || 'Failed to add doctor'
            };
        }
    } catch (error) {
        console.error('Error saving doctor:', error);
        return {
            success: false,
            message: 'Network error occurred while saving doctor'
        };
    }
}

/**
 * Filter Doctors
 * Retrieves doctors based on search criteria
 * @param {string} name - Doctor name to search for
 * @param {string} time - Available time slot
 * @param {string} specialty - Medical specialty
 * @returns {Array} Filtered array of doctor objects
 */
export async function filterDoctors(name = '', time = '', specialty = '') {
    try {
        // Build query parameters
        const params = new URLSearchParams();
        if (name && name.trim()) params.append('name', name.trim());
        if (time && time.trim()) params.append('time', time.trim());
        if (specialty && specialty.trim()) params.append('specialty', specialty.trim());

        const queryString = params.toString();
        const url = queryString ? `${DOCTOR_API}/filter?${queryString}` : `${DOCTOR_API}/all`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.doctors || data || [];
    } catch (error) {
        console.error('Error filtering doctors:', error);
        alert('Failed to filter doctors. Please try again.');
        return [];
    }
}

/**
 * Doctor Login
 * Authenticates a doctor and returns login response
 * @param {Object} credentials - Login credentials {email, password}
 * @returns {Object} Login response with success status
 */
export async function doctorLogin(credentials) {
    try {
        const response = await fetch(`${DOCTOR_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            // Store authentication data
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userData', JSON.stringify(data.doctor || data.user));
                localStorage.setItem('userRole', 'doctor');
            }

            return {
                success: true,
                data: data,
                message: 'Login successful!'
            };
        } else {
            return {
                success: false,
                message: data.message || 'Invalid credentials'
            };
        }
    } catch (error) {
        console.error('Doctor login error:', error);
        return {
            success: false,
            message: 'Network error occurred during login'
        };
    }
}

/**
 * Doctor Signup
 * Registers a new doctor account
 * @param {Object} doctorData - Doctor registration data
 * @returns {Object} Signup response with success status
 */
export async function doctorSignup(doctorData) {
    try {
        const response = await fetch(`${DOCTOR_API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctorData)
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: data,
                message: data.message || 'Registration successful!'
            };
        } else {
            return {
                success: false,
                message: data.message || 'Registration failed'
            };
        }
    } catch (error) {
        console.error('Doctor signup error:', error);
        return {
            success: false,
            message: 'Network error occurred during registration'
        };
    }
}

/**
 * Get Doctor Profile
 * Retrieves the authenticated doctor's profile information
 * @param {string} token - Authentication token
 * @returns {Object} Doctor profile data
 */
export async function getDoctorProfile(token) {
    try {
        const response = await fetch(`${DOCTOR_API}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                data: data.doctor || data
            };
        } else {
            return {
                success: false,
                message: 'Failed to fetch doctor profile'
            };
        }
    } catch (error) {
        console.error('Error fetching doctor profile:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

/**
 * Update Doctor Profile
 * Updates the authenticated doctor's profile information
 * @param {Object} profileData - Updated profile data
 * @param {string} token - Authentication token
 * @returns {Object} Update response
 */
export async function updateDoctorProfile(profileData, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: data,
                message: 'Profile updated successfully'
            };
        } else {
            return {
                success: false,
                message: data.message || 'Failed to update profile'
            };
        }
    } catch (error) {
        console.error('Error updating doctor profile:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

/**
 * Get Doctor Appointments
 * Retrieves appointments for the authenticated doctor
 * @param {string} token - Authentication token
 * @param {string} date - Optional date filter (YYYY-MM-DD)
 * @returns {Object} Appointments response
 */
export async function getDoctorAppointments(token, date = null) {
    try {
        let url = `${DOCTOR_API}/appointments`;
        if (date) {
            url += `?date=${date}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                data: data.appointments || data || []
            };
        } else {
            return {
                success: false,
                message: 'Failed to fetch appointments'
            };
        }
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}
