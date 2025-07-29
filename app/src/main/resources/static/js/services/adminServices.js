// Admin Services
import { getAuthToken, getUserData, makeApiRequest } from '../util.js';

const API_BASE = '/api/admin';

/**
 * Admin authentication services
 */

// Admin login
export async function adminLogin(credentials) {
    try {
        const response = await makeApiRequest('/api/auth/admin/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        if (response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userData', JSON.stringify(response.admin));
            localStorage.setItem('userRole', 'admin');
        }
        
        return {
            success: true,
            data: response,
            message: 'Login successful!'
        };
    } catch (error) {
        console.error('Admin login error:', error);
        return {
            success: false,
            message: error.message || 'Login failed. Please check your credentials.'
        };
    }
}

/**
 * User Management Services
 */

// Get all users
export async function getAllUsers() {
    try {
        const response = await makeApiRequest(`${API_BASE}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to load users.'
        };
    }
}

// Get all patients
export async function getAllPatients() {
    try {
        const response = await makeApiRequest(`${API_BASE}/patients`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error fetching patients:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to load patients.'
        };
    }
}

// Get all doctors
export async function getAllDoctors() {
    try {
        const response = await makeApiRequest(`${API_BASE}/doctors`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to load doctors.'
        };
    }
}

// Delete user (patient or doctor)
export async function deleteUser(userId, userType) {
    try {
        const response = await makeApiRequest(`${API_BASE}/${userType}s/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            message: `${userType} deleted successfully!`
        };
    } catch (error) {
        console.error(`Error deleting ${userType}:`, error);
        return {
            success: false,
            message: error.message || `Failed to delete ${userType}.`
        };
    }
}

// Update user status (activate/deactivate)
export async function updateUserStatus(userId, userType, status) {
    try {
        const response = await makeApiRequest(`${API_BASE}/${userType}s/${userId}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        return {
            success: true,
            data: response,
            message: `${userType} status updated successfully!`
        };
    } catch (error) {
        console.error(`Error updating ${userType} status:`, error);
        return {
            success: false,
            message: error.message || `Failed to update ${userType} status.`
        };
    }
}

/**
 * Appointment Management Services
 */

// Get all appointments
export async function getAllAppointments() {
    try {
        const response = await makeApiRequest(`${API_BASE}/appointments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to load appointments.'
        };
    }
}

// Get appointments by date range
export async function getAppointmentsByDateRange(startDate, endDate) {
    try {
        const response = await makeApiRequest(`${API_BASE}/appointments?start=${startDate}&end=${endDate}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error fetching appointments by date range:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to load appointments.'
        };
    }
}

// Update appointment
export async function updateAppointment(appointmentId, appointmentData) {
    try {
        const response = await makeApiRequest(`${API_BASE}/appointments/${appointmentId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        });
        
        return {
            success: true,
            data: response,
            message: 'Appointment updated successfully!'
        };
    } catch (error) {
        console.error('Error updating appointment:', error);
        return {
            success: false,
            message: error.message || 'Failed to update appointment.'
        };
    }
}

// Delete appointment
export async function deleteAppointment(appointmentId) {
    try {
        await makeApiRequest(`${API_BASE}/appointments/${appointmentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            message: 'Appointment deleted successfully!'
        };
    } catch (error) {
        console.error('Error deleting appointment:', error);
        return {
            success: false,
            message: error.message || 'Failed to delete appointment.'
        };
    }
}

/**
 * Prescription Management Services
 */

// Get all prescriptions
export async function getAllPrescriptions() {
    try {
        const response = await makeApiRequest(`${API_BASE}/prescriptions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to load prescriptions.'
        };
    }
}

// Delete prescription
export async function deletePrescription(prescriptionId) {
    try {
        await makeApiRequest(`${API_BASE}/prescriptions/${prescriptionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            message: 'Prescription deleted successfully!'
        };
    } catch (error) {
        console.error('Error deleting prescription:', error);
        return {
            success: false,
            message: error.message || 'Failed to delete prescription.'
        };
    }
}

/**
 * Dashboard Statistics Services
 */

// Get admin dashboard statistics
export async function getAdminDashboardStats() {
    try {
        const response = await makeApiRequest(`${API_BASE}/dashboard/stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: response
        };
    } catch (error) {
        console.error('Error fetching admin dashboard stats:', error);
        return {
            success: false,
            data: {
                totalPatients: 0,
                totalDoctors: 0,
                totalAppointments: 0,
                totalPrescriptions: 0,
                todayAppointments: 0,
                pendingAppointments: 0,
                completedAppointments: 0,
                cancelledAppointments: 0
            },
            message: error.message || 'Failed to load dashboard statistics.'
        };
    }
}

// Get appointment statistics by date range
export async function getAppointmentStats(startDate, endDate) {
    try {
        const response = await makeApiRequest(`${API_BASE}/stats/appointments?start=${startDate}&end=${endDate}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: response
        };
    } catch (error) {
        console.error('Error fetching appointment statistics:', error);
        return {
            success: false,
            data: {},
            message: error.message || 'Failed to load appointment statistics.'
        };
    }
}

// Get user registration statistics
export async function getUserRegistrationStats(period = 'month') {
    try {
        const response = await makeApiRequest(`${API_BASE}/stats/users?period=${period}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: response
        };
    } catch (error) {
        console.error('Error fetching user registration statistics:', error);
        return {
            success: false,
            data: {},
            message: error.message || 'Failed to load user registration statistics.'
        };
    }
}

/**
 * Search and Filter Services
 */

// Search users (patients and doctors)
export async function searchUsers(searchQuery, userType = 'all') {
    try {
        let url = `${API_BASE}/search/users?q=${encodeURIComponent(searchQuery)}`;
        if (userType !== 'all') {
            url += `&type=${userType}`;
        }
        
        const response = await makeApiRequest(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error searching users:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to search users.'
        };
    }
}

// Search appointments
export async function searchAppointments(searchQuery) {
    try {
        const response = await makeApiRequest(`${API_BASE}/search/appointments?q=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error searching appointments:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to search appointments.'
        };
    }
}

// Search prescriptions
export async function searchPrescriptions(searchQuery) {
    try {
        const response = await makeApiRequest(`${API_BASE}/search/prescriptions?q=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: Array.isArray(response) ? response : []
        };
    } catch (error) {
        console.error('Error searching prescriptions:', error);
        return {
            success: false,
            data: [],
            message: error.message || 'Failed to search prescriptions.'
        };
    }
}

/**
 * Report Generation Services
 */

// Generate user report
export async function generateUserReport(userType, format = 'json') {
    try {
        const response = await makeApiRequest(`${API_BASE}/reports/users/${userType}?format=${format}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: response,
            message: 'Report generated successfully!'
        };
    } catch (error) {
        console.error('Error generating user report:', error);
        return {
            success: false,
            message: error.message || 'Failed to generate user report.'
        };
    }
}

// Generate appointment report
export async function generateAppointmentReport(startDate, endDate, format = 'json') {
    try {
        const response = await makeApiRequest(`${API_BASE}/reports/appointments?start=${startDate}&end=${endDate}&format=${format}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: response,
            message: 'Report generated successfully!'
        };
    } catch (error) {
        console.error('Error generating appointment report:', error);
        return {
            success: false,
            message: error.message || 'Failed to generate appointment report.'
        };
    }
}

/**
 * System Configuration Services
 */

// Get system settings
export async function getSystemSettings() {
    try {
        const response = await makeApiRequest(`${API_BASE}/settings`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        
        return {
            success: true,
            data: response
        };
    } catch (error) {
        console.error('Error fetching system settings:', error);
        return {
            success: false,
            data: {},
            message: error.message || 'Failed to load system settings.'
        };
    }
}

// Update system settings
export async function updateSystemSettings(settings) {
    try {
        const response = await makeApiRequest(`${API_BASE}/settings`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        
        return {
            success: true,
            data: response,
            message: 'System settings updated successfully!'
        };
    } catch (error) {
        console.error('Error updating system settings:', error);
        return {
            success: false,
            message: error.message || 'Failed to update system settings.'
        };
    }
}

/**
 * Utility Functions
 */

// Format user data for display
export function formatUserData(user, userType) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        type: userType,
        status: user.status || 'active',
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        specialty: user.specialty || null, // for doctors
        dateOfBirth: user.dateOfBirth || null // for patients
    };
}

// Get user status badge class
export function getUserStatusClass(status) {
    switch (status) {
        case 'active': return 'badge-success';
        case 'inactive': return 'badge-warning';
        case 'suspended': return 'badge-danger';
        default: return 'badge-secondary';
    }
}

// Get appointment status for admin view
export function getAdminAppointmentStatusText(status) {
    switch (parseInt(status)) {
        case 0: return 'Scheduled';
        case 1: return 'Completed';
        case 2: return 'Cancelled';
        case 3: return 'No Show';
        default: return 'Unknown';
    }
}

// Get appointment status class for admin view
export function getAdminAppointmentStatusClass(status) {
    switch (parseInt(status)) {
        case 0: return 'badge-primary';
        case 1: return 'badge-success';
        case 2: return 'badge-danger';
        case 3: return 'badge-warning';
        default: return 'badge-secondary';
    }
}

// Filter functions
export function filterUsersByType(users, userType) {
    if (userType === 'all') return users;
    return users.filter(user => user.type === userType);
}

export function filterUsersByStatus(users, status) {
    if (!status) return users;
    return users.filter(user => user.status === status);
}

export function filterAppointmentsByStatus(appointments, status) {
    if (status === null || status === undefined) return appointments;
    return appointments.filter(appointment => appointment.status === parseInt(status));
}

export function filterAppointmentsByDate(appointments, date) {
    if (!date) return appointments;
    
    const filterDate = new Date(date).toDateString();
    return appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.appointmentTime).toDateString();
        return appointmentDate === filterDate;
    });
}

// Sort functions
export function sortUsersByName(users, ascending = true) {
    return users.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        
        if (ascending) {
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        } else {
            return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
        }
    });
}

export function sortAppointmentsByDate(appointments, ascending = true) {
    return appointments.sort((a, b) => {
        const dateA = new Date(a.appointmentTime);
        const dateB = new Date(b.appointmentTime);
        
        return ascending ? dateA - dateB : dateB - dateA;
    });
}

// Statistics calculation functions
export function calculateUserGrowth(currentStats, previousStats) {
    const growth = {
        patients: calculateGrowthPercentage(currentStats.totalPatients, previousStats.totalPatients),
        doctors: calculateGrowthPercentage(currentStats.totalDoctors, previousStats.totalDoctors),
        appointments: calculateGrowthPercentage(currentStats.totalAppointments, previousStats.totalAppointments)
    };
    
    return growth;
}

function calculateGrowthPercentage(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}

// Data validation functions
export function validateUserData(userData, userType) {
    const errors = [];
    
    if (!userData.name || userData.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!userData.email || !isValidEmail(userData.email)) {
        errors.push('Valid email is required');
    }
    
    if (!userData.phone || !isValidPhoneNumber(userData.phone)) {
        errors.push('Valid phone number is required');
    }
    
    if (userType === 'doctor' && (!userData.specialty || userData.specialty.trim() === '')) {
        errors.push('Specialty is required for doctors');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}
