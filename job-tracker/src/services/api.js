import axios from 'axios';

const api = axios.create({
    baseURL: 'https://job-tracker-1-e7fg.onrender.com'
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
    const userData = localStorage.getItem('job_tracker_user');
    if (userData) {
        const { token } = JSON.parse(userData);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
