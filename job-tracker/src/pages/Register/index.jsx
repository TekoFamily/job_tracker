import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { register } from '../../services/auth';
import Input from '../../components/Form/Input';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = register(formData.email, formData.password, formData.name);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError('Falha no cadastro');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Briefcase size={48} color="#2563eb" style={{ marginBottom: '1rem' }} />
                    <h1 className="page-title" style={{ fontSize: '1.75rem' }}>Criar Conta</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Comece a organizar suas candidaturas</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'var(--status-rejected)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <Input
                        id="name"
                        type="text"
                        label="Nome Completo"
                        placeholder="João Silva"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="email"
                        type="email"
                        label="E-mail"
                        placeholder="voce@exemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="password"
                        type="password"
                        label="Senha"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Cadastrar
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Já tem uma conta? <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Entre</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
