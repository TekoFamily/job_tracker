const USER_KEY = 'job_tracker_user';

export const login = (email, password) => {
    // Mock authentication
    if (email && password) {
        const user = { email, token: 'mock-token-123' };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
};




export const register = (email, password, name) => {
    // Mock registration
    const user = { email, name, token: 'mock-token-123' };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return { success: true, user };
};

export const logout = () => {
    localStorage.removeItem(USER_KEY);
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
}
