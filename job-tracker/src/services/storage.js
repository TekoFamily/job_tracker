const APPS_KEY = 'job_tracker_apps';
const PROFILE_KEY = 'job_tracker_profile';

const initialApps = [
  {
    id: '1',
    company: 'Google',
    role: 'Engenheiro Frontend',
    link: 'https://careers.google.com',
    date: '2023-10-15',
    status: 'Entrevista RH',
    notes: 'Primeira etapa foi boa. Aguardando feedback.',
  },
  {
    id: '2',
    company: 'Spotify',
    role: 'Desenvolvedor Web',
    link: 'https://www.lifeatspotify.com/',
    date: '2023-10-20',
    status: 'Pendente',
    notes: 'Aplicado via indicação.',
  }
];

export const getApplications = () => {
  const data = localStorage.getItem(APPS_KEY);
  if (!data) {
    localStorage.setItem(APPS_KEY, JSON.stringify(initialApps));
    return initialApps;
  }
  return JSON.parse(data);
};

export const saveApplication = (app) => {
  const apps = getApplications();
  if (app.id) {
    // Edit
    const index = apps.findIndex(a => a.id === app.id);
    if (index !== -1) {
      apps[index] = app;
    }
  } else {
    // Add
    app.id = Date.now().toString();
    apps.push(app);
  }
  localStorage.setItem(APPS_KEY, JSON.stringify(apps));
  return app;
};

export const deleteApplication = (id) => {
  const apps = getApplications();
  const newApps = apps.filter(a => a.id !== id);
  localStorage.setItem(APPS_KEY, JSON.stringify(newApps));
};

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
