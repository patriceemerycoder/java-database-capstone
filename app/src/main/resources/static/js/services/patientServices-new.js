// patientServices.js - Patient API Service Module
import { API_BASE_URL } from "../config/config.js";

// Set the Base Patient API Endpoint
const PATIENT_API = API_BASE_URL + '/patient';

/**
 * Create a Function to Handle Patient Signup
 * Accepts a data object with patient details and registers them
 */
export async function patientSignup(data) {
    try {
        const response = await fetch(`${PATIENT_API}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: result.message || 'Patient registered successfully',
                data: result
            };
        } else {
            return {
                success: false,
                message: result.message || 'Registration failed'
            };
        }
    } catch (error) {
        console.error('Error in patientSignup:', error);
        return {
            success: false,
            message: 'Network error occurred during registration'
        };
    }
}

/**
 * Create a Function for Patient Login
 * Accepts login credentials and authenticates the patient
 */
export async function patientLogin(data) {
    try {
        console.log('Patient login attempt:', data); // For development (remove in production)
        
        const response = await fetch(`${PATIENT_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            // Store authentication data
            if (result.token) {
                localStorage.setItem('authToken', result.token);
                localStorage.setItem('userData', JSON.stringify(result.patient));
                localStorage.setItem('userRole', 'patient');
            }

            return {
                success: true,
                data: result,
                message: 'Login successful!'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Invalid credentials'
            };
        }
    } catch (error) {
        console.error('Error in patientLogin:', error);
        return {
            success: false,
            message: 'Network error occurred during login'
        };
    }
}

/**
 * Create a Function to Fetch Logged-in Patient Data
 * Takes an authentication token and retrieves patient details
 */
export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const patientData = await response.json();
            return patientData;
        } else {
            console.error('Failed to fetch patient data:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error in getPatientData:', error);
        return null;
    }
}

/**
 * Create a Function to Fetch Patient Appointments
 * Dynamic function that works for both patient and doctor dashboards
 */
export async function getPatientAppointments(id, token, user) {
    try {
        // Construct dynamic API URL based on user type
        let url;
        if (user === "patient") {
            url = `${PATIENT_API}/appointments/${id}`;
        } else if (user === "doctor") {
            url = `${API_BASE_URL}/doctor/patient-appointments/${id}`;
        } else {
            // Default to patient endpoint if user type not specified
            url = `${PATIENT_API}/appointments/${id}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const appointments = await response.json();
            return {
                success: true,
                data: appointments
            };
        } else {
            console.error('Failed to fetch appointments:', response.statusText);
            return {
                success: false,
                message: 'Failed to fetch appointments'
            };
        }
    } catch (error) {
        console.error('Error in getPatientAppointments:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

/**
 * Create a Function to Filter Appointments
 * Filters appointments based on condition and patient name
 */
export async function filterAppointments(condition, name, token) {
    try {
        // Construct query parameters
        const params = new URLSearchParams();
        if (condition && condition.trim()) params.append('condition', condition);
        if (name && name.trim()) params.append('name', name);

        const queryString = params.toString();
        const url = queryString ? 
            `${PATIENT_API}/appointments/filter?${queryString}` : 
            `${PATIENT_API}/appointments`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const filteredAppointments = await response.json();
            return filteredAppointments || [];
        } else {
            console.error('Failed to filter appointments:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error in filterAppointments:', error);
        alert('Failed to filter appointments. Please try again.');
        return [];
    }
}

/**
 * Additional Patient Services for Dashboard Functionality
 */

// Get patient profile
export async function getPatientProfile(patientId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${PATIENT_API}/profile/${patientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to fetch patient profile'
            };
        }
    } catch (error) {
        console.error('Error fetching patient profile:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

// Get patient prescriptions
export async function getPatientPrescriptions(patientId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/api/prescriptions/patient/${patientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to fetch prescriptions'
            };
        }
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

// Get available doctors
export async function getAvailableDoctors() {
    try {
        const response = await fetch(`${API_BASE_URL}/doctor/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result
            };
        } else {
            return {
                success: false,
                message: 'Failed to fetch doctors'
            };
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

// Get doctor availability
export async function getDoctorAvailability(doctorId, date) {
    try {
        const response = await fetch(`${API_BASE_URL}/doctor/availability/${doctorId}?date=${date}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result
            };
        } else {
            return {
                success: false,
                message: 'Failed to fetch doctor availability'
            };
        }
    } catch (error) {
        console.error('Error fetching doctor availability:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

// Book appointment
export async function bookAppointment(appointmentData) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(appointmentData)
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result,
                message: 'Appointment booked successfully'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to book appointment'
            };
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

// Cancel appointment
export async function cancelAppointment(appointmentId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/api/appointments/cancel/${appointmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                cancelledBy: 'patient'
            })
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: 'Appointment cancelled successfully'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to cancel appointment'
            };
        }
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}
