import api from './api';

const PROFILE_KEY = 'job_tracker_profile';

export const getApplications = async () => {
  try {
    const response = await api.get('/vagas');
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

export const saveApplication = async (app) => {
  try {
    if (app.id) {
      // Edit
      const response = await api.put(`/vagas/${app.id}`, app);
      return response.data;
    } else {
      // Add
      const response = await api.post('/vagas', app);
      return response.data;
    }
  } catch (error) {
    console.error('Error saving application:', error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try {
    await api.delete(`/vagas/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};

// Mantemos o perfil no localStorage por enquanto, ou poderíamos mover para o backend também
export const getProfile = () => {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : {
    name: 'Seu Nome',
    email: 'email@exemplo.com',
    age: '',
    currentRole: 'Desenvolvedor de Software',
    targetRole: 'Engenheiro Frontend Sênior',
    experience: '',
    education: '',
    skills: ''
  };
};

export const saveProfile = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};
