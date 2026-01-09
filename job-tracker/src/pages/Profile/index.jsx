import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Input from '../../components/Form/Input';
import { getProfile, saveProfile } from '../../services/storage';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '', email: '', age: '', currentRole: '', targetRole: '', experience: '', education: '', skills: ''
    });
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setProfile(getProfile());
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveProfile(profile);
        setMsg('Perfil salvo com sucesso!');
        setTimeout(() => setMsg(''), 3000);
    };

    return (
        <>
            <Navbar />
            <div className="container" style={{ maxWidth: '600px', marginTop: '2rem' }}>
                <h1 className="page-title">Meu Perfil</h1>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input id="name" label="Nome Completo" value={profile.name} onChange={handleChange} required />
                            <Input id="age" label="Idade" type="number" value={profile.age} onChange={handleChange} />
                        </div>

                        <Input id="email" label="E-mail" type="email" value={profile.email} onChange={handleChange} required />

                        <Input id="currentRole" label="Cargo Atual" value={profile.currentRole} onChange={handleChange} />
                        <Input id="targetRole" label="Cargo de Interesse" value={profile.targetRole} onChange={handleChange} />

                        <div style={{ margin: '1rem 0' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Experiência</label>
                            <textarea id="experience" className="input-field" rows="4" value={profile.experience || ''} onChange={handleChange} placeholder="Liste sua experiência profissional..." />
                        </div>

                        <div style={{ margin: '1rem 0' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Formação Acadêmica</label>
                            <textarea id="education" className="input-field" rows="3" value={profile.education || ''} onChange={handleChange} placeholder="Graduações e cursos..." />
                        </div>

                        <div style={{ margin: '1rem 0' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500, display: 'block', marginBottom: '0.5rem' }}>Habilidades</label>
                            <textarea id="skills" className="input-field" rows="2" value={profile.skills || ''} onChange={handleChange} placeholder="React, JavaScript, Node.js..." />
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            Salvar Perfil
                        </button>
                        {msg && <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--status-approved)' }}>{msg}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
