// doctorServices.js - Doctor API Service Module
import { API_BASE_URL } from "../config/config.js";

// Set Doctor API Endpoint
const DOCTOR_API = API_BASE_URL + '/doctor';

/**
 * Create a Function to Get All Doctors
 * Fetches the list of all available doctors from the backend
 */
export async function getDoctors() {
    try {
        const response = await fetch(`${DOCTOR_API}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const doctors = await response.json();
            return doctors || [];
        } else {
            console.error('Failed to fetch doctors:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error in getDoctors:', error);
        return [];
    }
}

/**
 * Create a Function to Delete a Doctor
 * Allows authenticated admin to remove doctors from the system
 */
export async function deleteDoctor(id, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/delete/${id}/${token}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        
        if (response.ok) {
            return {
                success: true,
                message: result.message || 'Doctor deleted successfully'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to delete doctor'
            };
        }
    } catch (error) {
        console.error('Error in deleteDoctor:', error);
        return {
            success: false,
            message: 'Network error occurred while deleting doctor'
        };
    }
}

/**
 * Create a Function to Save (Add) a New Doctor
 * Allows admin to add new doctors to the system
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

        const result = await response.json();
        
        if (response.ok) {
            return {
                success: true,
                message: result.message || 'Doctor added successfully',
                data: result
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to add doctor'
            };
        }
    } catch (error) {
        console.error('Error in saveDoctor:', error);
        return {
            success: false,
            message: 'Network error occurred while adding doctor'
        };
    }
}

/**
 * Create a Function to Filter Doctors
 * Supports real-time search and filter features
 */
export async function filterDoctors(name, time, specialty) {
    try {
        // Construct query parameters
        const params = new URLSearchParams();
        if (name && name.trim()) params.append('name', name);
        if (time && time.trim()) params.append('time', time);
        if (specialty && specialty.trim()) params.append('specialty', specialty);

        const queryString = params.toString();
        const url = queryString ? `${DOCTOR_API}/filter?${queryString}` : `${DOCTOR_API}/all`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const doctors = await response.json();
            return doctors || [];
        } else {
            console.error('Failed to filter doctors:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error in filterDoctors:', error);
        alert('Failed to filter doctors. Please try again.');
        return [];
    }
}

/**
 * Doctor Authentication Services
 */

// Doctor signup
export async function doctorSignup(doctorData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/doctor/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(doctorData)
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result,
                message: 'Doctor registration successful!'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Registration failed'
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

// Doctor login
export async function doctorLogin(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/doctor/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const result = await response.json();

        if (response.ok) {
            // Store authentication data
            if (result.token) {
                localStorage.setItem('authToken', result.token);
                localStorage.setItem('userData', JSON.stringify(result.doctor));
                localStorage.setItem('userRole', 'doctor');
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
        console.error('Doctor login error:', error);
        return {
            success: false,
            message: 'Network error occurred during login'
        };
    }
}

/**
 * Doctor Dashboard Services
 */

// Get doctor profile
export async function getDoctorProfile(doctorId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${DOCTOR_API}/profile/${doctorId}`, {
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
                message: result.message || 'Failed to fetch doctor profile'
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

// Get doctor appointments
export async function getDoctorAppointments(doctorId, date = null) {
    try {
        const token = localStorage.getItem('authToken');
        let url = `${DOCTOR_API}/appointments/${doctorId}`;
        
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

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to fetch appointments'
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

// Update appointment status
export async function updateAppointmentStatus(appointmentId, status, notes = '') {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/api/appointments/update/${appointmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                status: status,
                notes: notes
            })
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: 'Appointment updated successfully'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to update appointment'
            };
        }
    } catch (error) {
        console.error('Error updating appointment status:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

// Get patient details for doctor
export async function getPatientDetails(patientId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/api/patients/${patientId}`, {
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
                message: result.message || 'Failed to fetch patient details'
            };
        }
    } catch (error) {
        console.error('Error fetching patient details:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}

// Create prescription
export async function createPrescription(prescriptionData) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/api/prescriptions/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(prescriptionData)
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                data: result,
                message: 'Prescription created successfully'
            };
        } else {
            return {
                success: false,
                message: result.message || 'Failed to create prescription'
            };
        }
    } catch (error) {
        console.error('Error creating prescription:', error);
        return {
            success: false,
            message: 'Network error occurred'
        };
    }
}
