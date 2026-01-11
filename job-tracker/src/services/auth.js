import api from './api';

const USER_KEY = 'job_tracker_user';

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        const { token, user } = response.data;

        const userData = { ...user, token };
        localStorage.setItem(USER_KEY, JSON.stringify(userData));

        return { success: true, user: userData };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.response?.data?.error || 'Erro ao realizar login'
        };
    }
};

export const register = async (email, password, name) => {
    try {
        const response = await api.post('/usuarios', { email, password, name });
        // Após registrar, fazemos o login automaticamente ou retornamos sucesso
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: error.response?.data?.error || 'Erro ao registrar usuário'
        };
    }
};

export const logout = () => {
    localStorage.removeItem(USER_KEY);
    // Opcional: redirecionar para login
    window.location.href = '/login';
};

export const getCurrentUser = () => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
};

export const updateCurrentUser = (data) => {
    let user = getCurrentUser();
    if (user) {
        user = { ...user, ...data };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};
