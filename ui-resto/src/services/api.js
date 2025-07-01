import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// --- Auth Functions ---
export const loginAdmin = (credentials) => api.post('/auth/login', credentials);

// --- Menu Functions ---
export const getAllMenus = () => api.get('/menu');
export const deleteMenuById = (id) => api.delete(`/menu/${id}`);
export const createMenu = (formData) => api.post('/menu', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateMenu = (id, formData) => api.put(`/menu/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// --- Order Functions ---
export const createPesanan = (dataPesanan) => api.post('/pesanan', dataPesanan);
export const getAllPesanan = () => api.get('/pesanan');
export const updateStatusPesanan = (id, status) => api.put(`/pesanan/${id}/status-pesanan`, { status });
export const updateStatusPembayaran = (id, status) => api.put(`/pesanan/${id}/status-pembayaran`, { status });

export default api;